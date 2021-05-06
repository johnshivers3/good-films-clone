"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Movies",
      [
        {
          title: "Constantine",
          releaseDate: "18 Feb 2005",
          description:
            "Supernatural exorcist and demonologist John Constantine helps a policewoman prove her sister's death was not a suicide, but something more.",
          genre: "Action",
          actors: "Keanu Reeves,Rachel Weisz,Djimon Hounsou,Shia LaBeouf",
          directors: "Francis Lawrence",
          image: "/Images/Constantine.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Blade",
          releaseDate: "21 Aug 1998",
          description:
            "A half-vampire, half-mortal man becomes a protector of the mortal race, while slaying evil vampires.",
          genre: "Action",
          actors:
            "Wesley Snipes,Stephen Dorff,Kris Kristofferson,N'Bushe Wright",
          directors: "Stephen Norrington",
          image: "/Images/Blade.jpg", 
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Hannibal Rising",
          releaseDate: "09 Feb 2007",
          description:
            "After the death of his parents during World War II, young Hannibal Lecter moves in with his beautiful aunt and begins plotting revenge on the barbarians responsible for his sister's death.",
          genre: "Action",
          actors: "Gaspard Ulliel,Rhys Ifans,Gong Li,Aaron Thomas",
          directors: "Peter Webber",
          image: "/Images/HannibalRising.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Se7en",
          releaseDate: "22 Sept 1995",
          description:
            "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
          genre: "Action",
          actors: "Morgan Freeman,Brad Pitt,Kevin Spacey",
          directors: "David Fincher",
          image: "/Images/Se7en.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Mortal Kombat",
          releaseDate: "23 April 2000",
          description:
            "MMA fighter Cole Young seeks out Earth's greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.",
          genre: "Action",
          actors: "Lewis Tan,Jessica McNamee,Josh Lawson",
          directors: "Simon McQuoid",
          image: "/Images/MortalKombat.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Home Alone",
          releaseDate: "16 Nov 1990",
          description:
            "An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.",
          genre: "Comedy",
          actors: "Macaulay Culkin,Joe Pesci,Daniel Stern",
          directors: "Chris Columbus",
          image: "/Images/HomeAlone.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Bruce Almighty",
          releaseDate: "23 May 2003",
          description:
            "A guy who complains about God too often is given almighty powers to teach him how difficult it is to run the world.",
          genre: "Comedy",
          actors: "Jim Carrey,Jennifer Aniston,Morgan Freeman",
          directors: "Tom Shadyac",
          image: "/Images/BruceAlmighty.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Rush Hour 2",
          releaseDate: "03 Aug 2001",
          description:
            "Carter and Lee head to Hong Kong for a vacation, but become embroiled in a counterfeit money scam.",
          genre: "Comedy",
          actors: "Jackie Chan,Chris Tucker,John Lone",
          directors: "Brett Ratner",
          image: "/Images/RushHour2.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ted",
          releaseDate: "29 June 2012",
          description:
            "John Bennett, a man whose childhood wish of bringing his teddy bear to life came true, now must decide between keeping the relationship with the bear, Ted or his girlfriend, Lori.",
          genre: "Comedy",
          actors: "Mark Wahlberg,Mila Kunis,Seth MacFarlane",
          directors: "Seth MacFarlane",
          image: "/Images/Ted.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Spaceballs",
          releaseDate: "24 Jun 1987",
          description:
            "A star-pilot for hire and his trusty sidekick must come to the rescue of a princess and save Planet Druidia from the clutches of the evil Spaceballs.",
          genre: "Comedy",
          actors: "Mel Brooks,John Candy,Rick Moranis",
          directors: "Mel Brooks",
          image: "/Images/SpaceBalls.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Alien",
          directors: "Ridley Scott",
          genre: "Horror",
          actors:
            "Tom Skerritt,Sigourney Weaver,Veronica Cartwright,Harry Dean Stanton",
          description:
            "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they soon realize that its life cycle has merely begun.",
          releaseDate: "25 May 1979",
          image: "/Images/alien_.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "The Conjuring",
          directors: "James Wan",
          genre: "Horror",
          actors: "Vera Farmiga,Patrick Wilson,Lili Taylor,Ron Livingston",
          description:
            "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
          releaseDate: "19 July 2013",
          image: "/Images/conjuring.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "It",
          directors: "Andy Muschietti",
          genre: "Horror",
          actors:
            "Jaeden Martell,Jeremy Ray Taylor,Sophia Lillis,Finn Wolfhard",
          description:
            "In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.",
          releaseDate: " 8 September 2017",
          image: "/Images/it.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Apartment 143",
          directors: "Carles Torrens",
          genre: "Horror",
          actors: "Francesc Garrido,Fiona Glascott,Rick Gonzalez,Kai Lennox",
          description:
            "A team of parapsychologists try to figure out a strange phenomenon occurring in an apartment building.",
          releaseDate: "4 May 2012",
          image: "/Images/apartment143.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Sinister",
          directors: "Scott Derrickson",
          genre: "Horror",
          actors: "Ethan Hawke,Juliet Rylance,Fred Thompson,James Ransone",
          description:
            "Washed-up true crime writer Ellison Oswalt finds a box of super 8 home movies in his new home that suggest the murder that he is currently researching is the work of a serial killer whose work dates back to the 1960s.",
          releaseDate: "12 October 2012",
          image: "/Images/sinister.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "My Octopus Teacher",
          directors: "Pippa Ehrlich,James Reed",
          genre: "Documentary",
          actors: "Craig Foster,Tom Foster",
          description:
            "A filmmaker forges an unusual friendship with an octopus living in a South African kelp forest, learning as the animal shares the mysteries of her world.",
          releaseDate: "7 September 2020",
          image: "/Images/myOctopusTeacher.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "The Last Dance",
          directors: "Jason Hehir",
          genre: "Documentary",
          actors: "Phil Jackson,Michael Jordan,David Aldridge,Scottie Pippen",
          description:
            "Charting the rise of the 1990's Chicago Bulls, led by Michael Jordan, one of the most notable dynasties in sports history.",
          releaseDate: "19 April 2020",
          image: "/Images/lastDance.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "The Social Dilemma",
          directors: "Jeff Orlowski",
          genre: "Documentary",
          actors: "Tristan Harris,Jeff Seibert,Bailey Richardson,Joe Toscano",
          description:
            "Explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations.",
          releaseDate: "9 September 2020",
          image: "/Images/theSocialDilemma.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Icarus",
          directors: "Bryan Fogel",
          genre: "Documentary",
          actors: "Bryan Fogel,Dave Zabriskie,Don Catlin,Grigory Rodchenkov",
          description:
            "When Bryan sets out to uncover the truth about doping in sports, a chance meeting with a Russian scientist transforms his story from a personal experiment into a geopolitical thriller.",
          releaseDate: "4 August 2017",
          image: "/Images/icarus.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Free Solo",
          directors: "Scott Derrickson",
          genre: "Documentary",
          actors: "Alex Honnold,Tommy Caldwell,Jimmy Chin,Cheyne Lempe",
          description:
            "Alex Honnold attempts to become the first person to ever free solo climb El Capitan.",
          releaseDate: "13 December 2018",
          image: "/Images/freeSolo.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Movies", null, {});
  },
};
