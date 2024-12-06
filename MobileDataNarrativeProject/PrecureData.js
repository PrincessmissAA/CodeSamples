//Read the data
d3.csv"https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv",

  // When reading the csv, I must format variables:
  d => {
      return {date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value}}).then(

  // Now I can use this dataset:

  PrecureDataSet  [
    {2006, "Futari Wa Precure Splash Star", 12.3, 1.8, 3.3, 4.3}
    {2007, "Yes! Precure 5", 6, 1.7, 5.1, 7.9}
    {2008, "Yes! Precure 5 Gogo!", 10.5, 2.8, 5.5, 7.5}
    {2009, "Fresh Precure", 10.5, 2.3, 5.7, 8.5}
    {2010, "Heartcatch Precure", 11.9, 3.2, 6.8, 9.6}
    {2011, "Suite Precure", 12.5, 2.6, 5.2, 7.4}
    {2012, "Smile Precure", 10.7, 2.8, 5.7, 7.5}
    {2013, "DokiDoki Precure", 10.6, 2.4, 4.9, 6.5}
    {2014, "Happiness Charge Precure", 9.8, 1.9, 3.6, 4.5}
    {2015, "Go! Princess Precure", 6.5, 1.6, 3.4, 4.4}
    {2016, "Maho Tsukai Precure", 6.6, 1.6, 3.6, 4.9}
    {2017, "Kirakira Precue A la Mode", 7.5, 1.8, 3.8, 5.4}
    {2018, "Hugtto Precure", 8.1, 2.5, 5.1, 7.1}
    {2019, "Star Twinkle Precure", 10.1, 2.3, 4.5, 5.8}
    {2020, "Healin' Good Precure", 8.3, 1.8, 3.3, 4.4}
    {2021, "Tropical Rouge Precure", 6.6, 1.6, 3, 3.7}
    {2022, "Delicous Party Precure", 5.7, 1.3, 2.9, 3.5}
    {2023, "Hero Girl Sky Precure", 5.6,1.2, 2.8, 4.3}
  ]