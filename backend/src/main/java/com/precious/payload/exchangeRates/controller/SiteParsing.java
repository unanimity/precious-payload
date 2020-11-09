package com.precious.payload.exchangeRates.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class SiteParsing {
  private static final String RF_RATE_URL = "https://www.cbr.ru/currency_base/daily/?UniDbQuery.Posted=True&UniDbQuery.To=";
  private static final int RF_VALUE_INDEX=4;

  public static Map <String, String> getSiteData(String date, String currency){
    Document doc = null;
    Map <String, String> dayRate = null;
    try {
      doc = Jsoup.connect(RF_RATE_URL+date).get();
      Elements trs = doc.select("tr");
      for (Element tr : trs) {
        if (tr.toString().contains(currency)){
          return new HashMap<String, String>(){{
            put("date",date);
            put("currency",currency);
            put("value",tr.select("td").get(RF_VALUE_INDEX).ownText());
          }};
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }
}
