from bumble_app import BumbleModel
import json

json_path = 'data.json'
with open(json_path, 'r') as file:
  data = json.load(file)

user_json_path = 'user_json.json'
with open(user_json_path, 'r') as file:
  user_data = json.load(file)

Bumble = BumbleModel(data=data,
                               cache_dir='bumble_cache')


#print(Bumble.fetch_top_matches())

new_matches = Bumble.run_model_update(data, user_data)
print(new_matches)