# FoodtruckAPI

An unofficial tttruck.com API to find foodtrucks

# How to call it

node apitttruck.js

Open browser to localhost:5001/foodtruck
# Parameters

day { if empty: today | today | tomorrow | timestamp (no more than 3 days after) }

time { if empty: lunch | breakfast | lunch | dinner | night }

address { if empty : Paris-France | ex: 5 Avenue Anatole France 75007 Paris, France }

Open browser to http://localhost:5001/foodtruck?day=today&time=lunch&address=5 Avenue Anatole France 75007 Paris, France

# Output

    [
    
    { image: 'http://tttruck.com/media/cache/square_200/files/restaurant/le-camion-qui-fume-ii/bbf3dd3a333ec020e70984e6d0af5dd6.png',

    name: 'Le Camion Qui Fume II',
    
    tags: 'Burger',
    
    latitude: '48.8317385',
    
    longitude: '2.3757138',
    
    distance: '0',
    
    open: 'open',
    
    starttime: '19:00',
    
    endtime: '22:30'
    
    } 
    
    ] 
    
