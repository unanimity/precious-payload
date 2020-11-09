package com.precious.payload.exchangeRates.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.precious.payload.exchangeRates.controller.CacheService.getCacheData;
import static com.precious.payload.exchangeRates.controller.CacheService.setCacheData;
import static com.precious.payload.exchangeRates.controller.SiteParsing.getSiteData;

@RestController
@CrossOrigin
@RequestMapping("rate")
public class ExchangeRateRF {

  private static final Integer MAX_RESPONSE_COUNT = 365;
  @GetMapping
  public List<Map<String, String>> rate(
    @RequestParam(required = true) String currency,
    @RequestParam(required = true) String date_from,
    @RequestParam(required = true) String date_to
  ) throws IOException {
    int overflow=0;
    List<Map<String, String>> response = new ArrayList<Map<String, String>>() {};
    LocalDate endDate = LocalDate.parse(date_to);
    for (
      LocalDate startDate = LocalDate.parse(date_from);
      startDate.isBefore(endDate) && overflow<MAX_RESPONSE_COUNT;
      startDate = startDate.plusDays(1)
    ){
      DateTimeFormatter formatters = DateTimeFormatter.ofPattern("dd.MM.uuuu");
      String date=startDate.format(formatters);
      Map<String, String> dayData= getCacheData(date,currency);
      if (dayData==null) {
         dayData=getSiteData(date,currency);
         setCacheData(dayData);
      }
      response.add(dayData);
      overflow++;
    }
    return response;
  }
}
