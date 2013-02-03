import requests

def get_districts(state,house):
	return requests.get('http://openstates.org/api/v1/districts/%s/%s/?apikey=072b29bd58654fc2b44685779cb71e3c' % (state, house)).json()

def get_shape(leg_id):
	return requests.get('http://openstates.org/api/v1/districts/boundary/%s/?apikey=072b29bd58654fc2b44685779cb71e3c' % leg_id).content

assembly_districts = get_districts('ca','upper')

for district in assembly_districts:
	outfile = open('public/data/assembly/%s.json' % district['id'],'w')
	shape = get_shape(district['boundary_id'])
	outfile.write(shape)