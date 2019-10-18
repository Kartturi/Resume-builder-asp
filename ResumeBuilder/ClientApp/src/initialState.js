let initialState = {
  userId: 2,
  resumeId: 0,
  layout: "resume1",
  resumeName: "new resume",
  name: "Artturi Hämäläinen",
  title: "Web-kehittäjä ja digimarkkinoija",
  personal: "Yksityiskohtaiset tiedot",
  phone: "0406723633",
  email: "artturi_hamalainen@hotmail.com",
  address: "Laivurinkatu 2 b32",
  profileTitle: "Profiili",
  profile:
    "Intohimoinen ja itseoppinnut web-kehittäjä. Koulut käyty tradenomikoulutuksen muodossa. Taidan myös digimarkkinoinnin saloja. ",
  linkTitle: "Links",
    links: [],
  hobbiesTitle: "Harrastukset",
  hobbies: "äänikirjat, ulkoilu, futis",
  workTitle: "Työkokemus",
  workData: [
    {
      company: "NH-toimistologistiikka",
      position: "Markkinointi- ja Web vastaava",
      time: "toukokuu 2017 – heinäkuu 2019",
      description:
        "Työtehtäviin kuuluu yrityksen verkkosivujen hallinta, verkkosivujen hakukoneoptimointi ja Google Adwords - mainonta. Sivujen konversio-optimointi, sisällön luonti ja kehittäminen ja asiakaspalvelu"
    },
    {
      company: "Hieroglifs inernational",
      position: "Markkinoinnin harjoittelija",
      time: "elokuu 2016 – marraskuu 2016",
        description:
        "Työtehtävät: Sosiaalisen median hallinta, mainosmateriaalien teko ja jakelu, asiakaspalvelu, asiakastietokantojen päivittäminen, kilpailija-analyysit, markkinointistrategian arviointia, avainsanojen kartoitusta."
    },
    {
      company: "Realia Oy",
      position: "Työntekijä",
      time: "elokuu 2014 – huhtikuu 2019",
        description:
        "Kotivisujen päivitystä, asiakaspalvelua, toimistokalusteiden asennus- ja siirtoprojektien hoitamista"
    }
  ],
  educationTitle: "Koulutus",
  education: [
    {
      school: "Tradenomi, Vaasan ammattikorkeakoulu",
      time: "elokuu 2019 – elokuu 2019",
          description: "Kansainvälisen kaupan tradenomi"
    },
    {
      school: "Erasmus-vaihto , Cracow university of economics",
      time: "elokuu 2019 – elokuu 2019",
      description: "Vaihto-oppilasjakso kauniissa Krakovassa markkinoinnin parissa "
    }
  ],
  recommendsTitle: "Suositukset",
  recommends: [
    {
      nameRecommends: "Ari Mäkinen",
      phoneRecommends: "0417256679",
      email: ""
    },
    {
      nameRecommends: "Niko Heikkilä",
      phoneRecommends: "0417256679",
      email: ""
    }
  ],
  projectsTitle: "Projektit",
  projects: [
    {
      name: "Thedasgame",
      time: "huhtikuu 2019 alkaen",
          description:
        "Dasgame opettaa saksan kielen sanoja nopeasti ja tehokkaasti. Tutustu sovellukseen www.thedasgame.com "
    }
  ],
  languageTitle: "Kielet",
  language: [
    { name: "Suomi", level: "Äidinkieli" },
      { name: "Englanti", level: "Erinomainen" },
      { name: "Ruotsi", level: "Tyydyttävä" }
  ],
  skillsTitle: "Taidot",
  skills: [
    { name: "Javascript/html/css", level: 5 },
    { name: "React/Redux", level: 4 },
    { name: "Wordpress", level: 3 },
    { name: "SEO", level: 3 },
    { name: "NodeJs", level: 4 },
    { name: "Google Ads", level: 3 },
    { name: "Python/Flask", level: 3 },
    { name: "Photoshop", level: 4 }
  ]
};

export default initialState;
