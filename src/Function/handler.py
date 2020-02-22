import os
import json
import boto3
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr

class C(object):
    ### Config area ###
    # database_region = 'us-west-1'
    # database_url = ''
    database_table = os.environ['TABLE_NAME']

    ### CONSTANT VALUES ###
    REGION_OF_INTREST_DIAMETER = 0.0003
    REGION_OF_INTREST_RADIUS = 0.0003 / 2.0

    KEYWORD_MESSAGES = 'messages'
    KEYWORD_MESSAGE = 'message'
    KEYWORD_LATITUDE = 'latitude'
    KEYWORD_LONGITUDE = 'longitude'

########## RESPONSE_FORMAT
# {
# 	messages: [
# 		{
# 			latitude: Number,
# 			longitude: Number,
# 			message: String
# 		}
# 	]
# }

def fetch_geographic_messages(latitude, longitude):
    region_of_interest_latitude, region_of_interest_longitude = get_area_of_geographic_intrest(latitude, longitude)
    table = get_database_table_handle()
    # query logic:
    # (latitude <= region_of_interest_latitude[0] and latitude >= region_of_interest_latitude[1]) and
    # (longitude <= region_of_interest_longitude[0] and longitude >= region_of_interest_longitude[1])
    fe = Key('latitude').between(*region_of_interest_latitude) & Key('longitude').between(*region_of_interest_longitude)
    response = table.scan(FilterExpression=fe)
    response_string = json.dumps(response, indent=2)
    print(response_string)
    return response_string

def get_database_table_handle():
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table(C.database_table)

def get_area_of_geographic_intrest(latitude, longitude):
    # TODO: There's got to be a more graceful way of doing the same logic
    latitude_max = latitude + C.REGION_OF_INTREST_RADIUS
    latitude_min = latitude - C.REGION_OF_INTREST_RADIUS

    longitude_max = longitude + C.REGION_OF_INTREST_RADIUS
    longitude_min = longitude - C.REGION_OF_INTREST_RADIUS

    return ((Decimal(latitude_max), Decimal(latitude_min)), (Decimal(longitude_max), Decimal(longitude_min)))

def handler(event, context):
    # Log the event argument for debugging and for use in local development.
    # print(json.dumps(event))
    response = fetch_geographic_messages(45.5163521, -122.6793312)

    return response

