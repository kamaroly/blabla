/**
 * Global variables
 */
var db = null;
var databaseName = "imbehe.db";
var createServicesTable = "CREATE TABLE IF NOT EXISTS services(id integer primary key,name varchar(50),logo varchar(255),description text,slug varchar(150),category_id integer,type varchar(50));";
var createServiceLinksTable = "CREATE TABLE IF NOT EXISTS service_links(id integer primary key,name varchar(50),value text,service_id integer);";
var createCategoriesTable = "CREATE TABLE IF NOT EXISTS categories(id integer primary key, name varchar(50),logo varchar(255),description text,slug varchar(150));";
var categoriesCount;
var servicesCount;

// Data base seedings
var CategoriesSeeding= [
    {
      "id"   : "1",
      "name": "Mobile Finance services",
      "logo": "http://virtaxchange.virtacoinmall.com/Tigo.gif",
      "description": "This is a sample of the product that is going to use Tigo cash as payment method",
      "slug": "mobile_finance_system",
      "reknown": "Royal Academy of Painting and Sculpture"
    },
    {
      "id"  : "2",
      "name": "Tigo packs",
      "logo": "img/tigo_packs.png",
      "description": "Tigo cash ni uburyo bugezweho bwo kohereza amafaranga",
      "slug": "mobile_finance_system",
      "reknown": "Royal Academy of Painting and Sculpture"
    },
    {
      "id"  : "3",
      "name": "Public services",
      "logo": "img/public_services.png",
      "description": "Public services for Government of Rwanda",
      "slug": "mobile_finance_system",
      "reknown": "Royal Academy of Painting and Sculpture"
    }
  ];

var ServiceLInksSeeding = [
      {
        "name":"Non Fiscal (Amafaranga atari Imisoro) ",
        "value":"https://nonfiscal.rra.gov.rw/"
      },
      {
        "name":"e-Tax/RSSB (Caisse Sociale & Rama)",
        "value":"e-Tax/RSSB (Caisse Sociale & Rama) "
      },
      {
        "name":"E-Tax Guides",
        "value":"http://www.rra.gov.rw/?page=etaxguide "
      },
      {
        "name":"Electronic Single Window",
        "value":"https://sw.gov.rw/"
      }];

// SEEDING SERVICES
var ServicesSeeding =  [
    {
      "id"  : "1",
      "name": "Tigo cash",
      "logo": "http://virtaxchange.virtacoinmall.com/Tigo.gif",
      "description": "This is a mobile financing service provided by Tigo rwanda",
      "slug": "mobile_finance_system",
      "category_id" : 1,
      "type":"mfs",
      "reknown": "Royal Academy of Painting and Sculpture"
    },
    {
      "id"  : "2",
      "name": "Social Security",
      "logo": "img/social_security.png",
      "description": "The Government established the Rwanda Social Security Board (RSSB) after the merger of Social Security Fund of Rwanda (SSFR) with Rwanda Health Insurance Fund (RAMA).",
      "slug": "social_security",
      "category_id" : 3,
      "type":"online",
      "services":[
      {
        "name":"Non Fiscal (Amafaranga atari Imisoro) ",
        "url":"https://nonfiscal.rra.gov.rw/"
      },
      {
        "name":"e-Tax/RSSB (Caisse Sociale & Rama)",
        "url":"e-Tax/RSSB (Caisse Sociale & Rama) "
      },
      {
        "name":"E-Tax Guides",
        "url":"http://www.rra.gov.rw/?page=etaxguide "
      },
      {
        "name":"Electronic Single Window",
        "url":"https://sw.gov.rw/"
      }],

      "tags": ""
    },
     {
      "id"  : "3",
      "name": "Police",
      "logo": "img/police.png",
      "description": "Please contact us at our General Headquarters with the details below. Please use the emergency phone numbers above for emergency purposes. Use the form below to contact us directly.",
      "slug": "police",
      "category_id" : 3,
      "type":"online",
      "services":[
      {
        "name":"Non Fiscal (Amafaranga atari Imisoro) ",
        "url":"https://nonfiscal.rra.gov.rw/"
      },
      {
        "name":"e-Tax/RSSB (Caisse Sociale & Rama)",
        "url":"e-Tax/RSSB (Caisse Sociale & Rama) "
      },
      {
        "name":"E-Tax Guides",
        "url":"http://www.rra.gov.rw/?page=etaxguide "
      },
      {
        "name":"Electronic Single Window",
        "url":"https://sw.gov.rw/"
      }],

      "tags": ""
    },
    {
      "id"  : "4",
      "name": "National ID",
      "logo": "img/public_services.png",
      "description": "Rwanda’s National ID Project ",
      "slug": "national_id",
      "category_id" : 3,
      "type":"online",
           "services":[
      {
        "name":"Non Fiscal (Amafaranga atari Imisoro) ",
        "url":"https://nonfiscal.rra.gov.rw/"
      },
      {
        "name":"e-Tax/RSSB (Caisse Sociale & Rama)",
        "url":"e-Tax/RSSB (Caisse Sociale & Rama) "
      },
      {
        "name":"E-Tax Guides",
        "url":"http://www.rra.gov.rw/?page=etaxguide "
      },
      {
        "name":"Electronic Single Window",
        "url":"https://sw.gov.rw/"
      }],

      "tags": ""
    },
    {
      "id"  : "5",
      "name": "Rwanda Revenue Authoriry",
      "logo": "img/rra.png",
      "description": "Mobilise revenue for economic development through efficient and equitable services that promote business growth",
      "slug": "national_id",
      "category_id" : 3,
      "type":"online",
      "services":[
      {
        "name":"Non Fiscal (Amafaranga atari Imisoro) ",
        "url":"https://nonfiscal.rra.gov.rw/"
      },
      {
        "name":"e-Tax/RSSB (Caisse Sociale & Rama)",
        "url":"e-Tax/RSSB (Caisse Sociale & Rama) "
      },
      {
        "name":"E-Tax Guides",
        "url":"http://www.rra.gov.rw/?page=etaxguide "
      },
      {
        "name":"Electronic Single Window",
        "url":"https://sw.gov.rw/"
      }],
      "tags": ""
    }, 
    {
      "id"  : "6",
      "name": "Rwanda Development Board",
      "logo": "img/rdb.png",
      "description": "Rwanda Development Board (RDB) KN 5 Rd, KG 9 Ave P.O. Box 6239 Kigali, RwandaFax: +250 252 580388 Email:info@rdb.rw",
      "slug": "rwanda_development_board",
      "category_id" : 3,
      "type":"online",
           "services":[
      {
        "name":"Non Fiscal (Amafaranga atari Imisoro) ",
        "url":"https://nonfiscal.rra.gov.rw/"
      },
      {
        "name":"e-Tax/RSSB (Caisse Sociale & Rama)",
        "url":"e-Tax/RSSB (Caisse Sociale & Rama) "
      },
      {
        "name":"E-Tax Guides",
        "url":"http://www.rra.gov.rw/?page=etaxguide "
      },
      {
        "name":"Electronic Single Window",
        "url":"https://sw.gov.rw/"
      }],
      "tags": ""
    },
    {
      "id"  : "7",
      "name": "Safe motos",
      "logo": "img/safemoto.png",
      "description": "SafeMotos using Rwanda as “test kitchen” for Africa-wide rollout",
      "slug": "rwanda_development_board",
      "category_id" : 4,
      "type":"online",
      "tags": ""
    },{
      "id"  : "8",
      "name": "Huguka.com",
      "logo": "img/huguka.png",
      "description": "Amasomo asobanutse y'ikoranabuhanga, atunganywa buri munsi.",
      "slug": "Huguka",
      "category_id" : 4,
      "type":"online",
           "services":[
      {
        "name":"Non Fiscal (Amafaranga atari Imisoro) ",
        "url":"https://nonfiscal.rra.gov.rw/"
      },
      {
        "name":"e-Tax/RSSB (Caisse Sociale & Rama)",
        "url":"e-Tax/RSSB (Caisse Sociale & Rama) "
      },
      {
        "name":"E-Tax Guides",
        "url":"http://www.rra.gov.rw/?page=etaxguide "
      },
      {
        "name":"Electronic Single Window",
        "url":"https://sw.gov.rw/"
      }],

      "tags": ""
    }  , 
     {
      "id"  : "9",
      "name": "Cyizere",
      "logo": "img/tigo_packs.png",
      "description": "On demand vuga pack",
      "slug": "cyizere",
      "category_id" : 1,
      "type":"airtime",
      "airtimeProducts":[
      {
        "name":"HOW TO GET IT",
        "value":"Dial *255# or *222*100# "
      },
      {
        "name":"PRICE (RWF) ",
        "value":"PRICE (RWF) "
      },
      {
        "name":"SECONDS (TIGO - TIGO)",
        "value":"800"
      },
       {
        "name":"SMS",
        "value":"13"
      },
      {
        "name":"DATA",
        "value":"O MB"
      },
      {
        "name":"Validity",
        "value":"24 Hrs"
      }

      ],
      "reknown": "Royal Academy of Painting and Sculpture"
    }

  ];	