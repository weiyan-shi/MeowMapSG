import os
import json

folder_path = '../cats_detail_json'
files = [f for f in os.listdir(folder_path) if f.endswith('.json') and f != 'manifest.json']

with open(os.path.join(folder_path, 'manifest.json'), 'w') as manifest_file:
    json.dump(files, manifest_file, indent=2)

print("manifest.json generated with", len(files), "entries.")