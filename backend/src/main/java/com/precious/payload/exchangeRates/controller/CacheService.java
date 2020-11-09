package com.precious.payload.exchangeRates.controller;



import redis.clients.jedis.Jedis;

import java.util.HashMap;
import java.util.Map;

public class CacheService {
  public static Map<String, String> getCacheData(String date, String currency){
    Jedis jedis = new Jedis();
    String value = jedis.get(date+"-"+currency);
    if(value!=null){
      return new HashMap<String, String>(){{
        put("date",date);
        put("currency",currency);
        put("value",value);
      }};
    }
   return null;
  }
  public static void setCacheData(Map<String, String> data){
    Jedis jedis = new Jedis();
    jedis.set(data.get("date")+"-"+data.get("currency"), data.get("value"));
  }
}
