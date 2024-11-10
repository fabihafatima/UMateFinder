import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
import json
import os


class BumbleModel:

  def __init__(self,data, cache_dir):
    self.data = data
    self.features_matrix = None
    self.similarity_matrix = None
    self.similarity_cache_path = f"{cache_dir}/similarity_matrix.pkl"
    self.features_cache_path = f"{cache_dir}/features_matrix.pkl"
    self.top_matches_path = f"{cache_dir}/top_matches.pkl"
    os.makedirs(cache_dir, exist_ok=True)
    self.run_model_init(self.data)


  def run_model_init(self, json_data):

    features_matrix = self._preprocess(json_data)
    similarity_matrix = cosine_similarity(features_matrix)
    self._save_to_cache(self.similarity_cache_path, similarity_matrix)
    self._save_to_cache(self.features_cache_path, features_matrix)
    initial_top_matches = {}
    num_users = features_matrix.shape[0]


    for i in range(num_users):
        recommended_indices = self._recommend_top_5(i, similarity_matrix)
        user_email = json_data[i]['email']
        recommended_emails = [json_data[idx]['email'] for idx in recommended_indices]
        initial_top_matches[user_email] = recommended_emails

    self._save_to_cache(self.top_matches_path, initial_top_matches)

       

  def run_model_update(self, data, new_user):

      if self._is_cached(self.similarity_cache_path):
          self.similarity_matrix = self._load_from_cache(self.similarity_cache_path)
 
      if self._is_cached(self.features_cache_path):
          self.features_matrix = self._load_from_cache(self.features_cache_path)
      
      self.data=data
      new_user_features = self._preprocess(data)
      updated_features_matrix= new_user_features
      updated_similarity_matrix=cosine_similarity(updated_features_matrix)
      
      self.similarity_matrix = updated_similarity_matrix
      self.feature_matrix = updated_features_matrix
      self._save_to_cache(self.similarity_cache_path, self.similarity_matrix)
      self._save_to_cache(self.features_cache_path, self.features_matrix)

      try:
          old_top_matches = self._load_from_cache(self.top_matches_path)
      except FileNotFoundError:
          old_top_matches = {}



      new_top_matches = {}
      for i in range(len(updated_similarity_matrix)):
          user_email = self.data[i]['email']
          
          # Get old and new recommendations
          old_top_5 = old_top_matches.get(user_email, [])
          new_top_5 = self._recommend_top_5(i, updated_similarity_matrix)
          
          # Compare old and new recommendations, if different, update dictionary
          if old_top_5 != new_top_5:
              new_top_matches[user_email] = [self.data[idx]['email'] for idx in new_top_5]
              old_top_matches[user_email] = [self.data[idx]['email'] for idx in new_top_5]

      self._save_to_cache(self.top_matches_path, old_top_matches)
      return new_top_matches
        

  def _recommend_top_5(self,student_index, similarity_matrix):
    """
    Get top 5 recommended roommates for a given user based on similarity scores.
    """
    scores = list(enumerate(similarity_matrix[student_index]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)
    recommended_indices = [index for index, score in scores[1:6]]  # Exclude self-match
    return recommended_indices
  
  def _preprocess(self,data):
    preference_df = pd.json_normalize(data, sep='_')
    selected_data = preference_df[['email', 'startDate', 'endDate', 'courseDuration', 'homeTown', 'dietaryPreference', 'drink', 'smoke', 'cleanliness', 'budget', 'hobbies', 'cook', 'age', 'degree', 'gender', 'major', 'preference_location', 'preference_gender', 'preference_dietaryPreference', 'preference_openToDrink', 'preference_openToSmoke', 'preference_cleanliness','preference_numberOfRoommates','preference_roomPreference']]
    selected_data['startDate'] = pd.to_datetime(selected_data['startDate'])
    selected_data['endDate'] = pd.to_datetime(selected_data['endDate'])

    selected_data['start_month'] = selected_data['startDate'].dt.month
    selected_data['end_month'] = selected_data['endDate'].dt.month

    selected_data['Length_of_stay'] = (selected_data['endDate'] - selected_data['startDate']).dt.days

    location_exploded = selected_data.explode('preference_location')

    location_dummies = pd.get_dummies(location_exploded['preference_location'])

    location_one_hot = location_dummies.groupby(location_exploded.index).sum()

    hobbies_exploded = selected_data.explode('hobbies')

    hobbies_dummies = pd.get_dummies(hobbies_exploded['hobbies'])
    hobbies_one_hot = hobbies_dummies.groupby(hobbies_exploded.index).sum()
    final_data = pd.concat([location_one_hot, hobbies_one_hot], axis=1)
    final_data_array = final_data.to_numpy()
    preference_features = ['start_month', 'end_month','preference_gender' , 'preference_dietaryPreference', 'preference_openToDrink', 'preference_openToSmoke', 'preference_cleanliness', 'preference_numberOfRoommates', 'preference_roomPreference']
    profile_features = ['courseDuration', 'dietaryPreference','homeTown', 'drink', 'smoke', 'cleanliness', 'budget', 'cook', 'age', 'degree', 'gender', 'major'  ]
    categorical_features = preference_features + profile_features
    numerical_features = ['age', 'budget']
 
    encoder = OneHotEncoder()
    encoded_features = encoder.fit_transform(selected_data[categorical_features]).toarray()   
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(selected_data[numerical_features])
    merged_data = np.concatenate([final_data_array, encoded_features], axis=1)
    features = np.hstack((merged_data, scaled_features))

    preference_weight = 2.0 
    profile_weight = 0.5   

    weights = np.ones(features.shape[1])
    preference_indices = range(len(encoder.categories_[0])) 
    profile_indices = range(len(encoder.categories_[0]), features.shape[1])

    weights[preference_indices] *= preference_weight
    weights[profile_indices] *= profile_weight

    weighted_features = features * weights


    return weighted_features

    
  def _is_cached(self, file_path):
    """Check if the file exists in cache."""
    try:
          with open(file_path, 'rb') as f:
              return True
    except FileNotFoundError:
          return False

  def _save_to_cache(self, file_path, data):
      """Save data to the cache directory."""
      joblib.dump(data, file_path)

  def _load_from_cache(self, file_path):
      """Load data from the cache directory."""
      return joblib.load(file_path)
  
  def fetch_top_matches(self):
      top_matches= self._load_from_cache(self.top_matches_path)
      return top_matches
      



