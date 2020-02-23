import os
import json
import boto3
from time import time
from random import random

def get_uid():
    # TODO: real uid
    return int(random()*1000) + 10

def get_database_table_handle():
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table(os.environ['TABLE_NAME'])

def put_message(**kwargs):
    payload = {
        'latitude': kwargs['latitude'] if 'latitude' in kwargs else 'latitude Uh oh!',
        'longitude': kwargs['longitude'] if 'longitude' in kwargs else 'longitude Uh oh!',
        'timestamp': int(time()),
        'message': str(kwargs['message']) if 'message' in kwargs else 'messsage Uh oh!',
        'id': get_uid(),
        'from': str(kwargs['from']) if 'from' in kwargs else 'from Uh oh!',
        'to': str(kwargs['to']) if 'to' in kwargs else 'to Uh oh!'
    }
    table = get_database_table_handle()
    table.put_item(Item=payload)
    return payload

def handler(event, context):
    # Log the event argument for debugging and for use in local development.
    print(json.dumps(event))
    clean_event = event
    if 'body' in event:
        # clean_event = event['body']
        clean_event = json.loads(event['body'])

    payload = put_message(**clean_event)

    return_val = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        },
        'body': json.dumps(payload)
    }
    return return_val
