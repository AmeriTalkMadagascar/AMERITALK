// Structured pedagogical reconstruction of LESSON 3.pdf (Level 3).
import type { LessonV2 } from "./content-v2";

export const niv3StructuredLessons: LessonV2[] = [
  {
    "id": "ch3-l1",
    "chapterId": "ch3",
    "title": "Talking About Time with Take",
    "subtitle": "Fomba fampiasana ny matoanteny take hilazana ny faharetan'ny fotoana",
    "duration": "15 min",
    "cards": [
      {
        "id": "ch3-l1-c1",
        "type": "explanation",
        "title": "Take rehefa milaza faharetana",
        "englishTitle": "TALKING ABOUT TIME",
        "malagasyExplanation": "Ampiasaina ny matoanteny take hilazana hoe hafiriana no lanin'ny olona, ny asa iray, na zavatra iray vao vita. Miova ny firafitry ny fehezanteny arakaraka izay tiana hasongadina: ny olona, ny asa, ilay zavatra, na ny toe-javatra amin'ny ankapobeny.",
        "content": "In this lesson, take expresses the amount of time needed to complete an action.",
        "examples": [
          {
            "english": "Learning English takes time!",
            "malagasy": "Mila fotoana ny fianarana teny anglisy!"
          }
        ]
      },
      {
        "id": "ch3-l1-c2",
        "type": "formula",
        "title": "Ny olona no lohahevitra",
        "formula": "person + take + time + to + verb",
        "malagasyExplanation": "Rehefa olona no lohahevitra, dia aseho aorian'ny take ny faharetan'ny fotoana ary ampiasaina ny to + matoanteny hamaritana ilay asa. Ovay araka ny tense sy ny subject ny endriky ny take: take, takes, took, na will take.",
        "examples": [
          {
            "english": "Last night, the train was late, so I took 3 hours to get home.",
            "malagasy": "Omaly alina, tara ny lamasinina ka nandany adiny 3 aho vao tonga tany an-trano."
          },
          {
            "english": "She takes all day to get out of the bathroom!",
            "malagasy": "Mandany tontolo andro izy vao mivoaka ny efitra fandroana!"
          }
        ]
      },
      {
        "id": "ch3-l1-c3",
        "type": "formula",
        "title": "Ny asa na hetsika no lohahevitra",
        "formula": "activity + take + person + time",
        "malagasyExplanation": "Raha ilay dia, fialamboly, na hetsika no lohahevitra, dia apetraka aorian'ny take ny olona voakasika sy ny faharetan'ny fotoana. Indraindray tsy ilaina ny manampy to + verb satria ilay hetsika mihitsy no voalaza.",
        "examples": [
          {
            "english": "The journey took me 3 hours.",
            "malagasy": "Naharitra adiny 3 tamiko ilay dia."
          },
          {
            "english": "Gardening takes a lot of time!",
            "malagasy": "Mandany fotoana be ny fikarakarana zaridaina!"
          },
          {
            "english": "Reading this book took me 2 hours!",
            "malagasy": "Nandany adiny 2 tamiko ny famakiana ity boky ity!"
          }
        ]
      },
      {
        "id": "ch3-l1-c4",
        "type": "formula",
        "title": "Ilay zavatra no lohahevitra",
        "formula": "object + take + person + time + to + verb",
        "malagasyExplanation": "Raha zavatra iray no mila fotoana vao vita na ampiasaina, dia apetraka eo am-piandohana ilay zavatra, arahin'ny olona sy ny faharetana, avy eo to + verb. Ity rafitra ity dia manasongadina ilay zavatra mandany fotoana.",
        "examples": [
          {
            "english": "The house will take me all week to clean.",
            "malagasy": "Handany herinandro manontolo amiko ny fanadiovana ilay trano."
          },
          {
            "english": "The newspaper took him 2 hours to read!",
            "malagasy": "Nandany adiny 2 taminy ny famakiana ilay gazety!"
          },
          {
            "english": "The video took him 2 hours to edit!",
            "malagasy": "Nandany adiny 2 taminy ny fanitsiana ilay video!"
          }
        ]
      },
      {
        "id": "ch3-l1-c5",
        "type": "formula",
        "title": "Ny It manondro toe-javatra ankapobeny",
        "formula": "It + take + person + time + to + verb",
        "malagasyExplanation": "Ny It dia ampiasaina rehefa tsy mila manonona olona na zavatra manokana ho lohahevitra isika. Izy no rafitra mahazatra amin'ny filazana hoe hafiriana no nilaina hanaovana asa iray.",
        "examples": [
          {
            "english": "It took me 3 hours to get home last night.",
            "malagasy": "Naharitra adiny 3 aho vao tonga tany an-trano omaly alina."
          },
          {
            "english": "It took me 5 hours to finish the book!",
            "malagasy": "Naharitra adiny 5 aho vao nahavita ilay boky!"
          },
          {
            "english": "It took me 3 hours to water the plants!",
            "malagasy": "Naharitra adiny 3 aho vao nanondraka ireo zavamaniry!"
          }
        ]
      },
      {
        "id": "ch3-l1-c6",
        "type": "formula",
        "title": "Fotoana mandra-pahavitan'ny zavatra iray",
        "formula": "It + take + person + time + before / until + clause",
        "malagasyExplanation": "Ampiasaina ny before (alohan'ny) na until (mandra-pahatongan'ny) rehefa tiana hasongadina fa nisy fotoana niandrasana mandra-pahatanteraka ny vokatra iray. Samy azo ampiasaina ireo teny roa ireo amin'ity lesona ity.",
        "examples": [
          {
            "english": "It took us 6 weeks until we got the house clean.",
            "malagasy": "Naharitra 6 herinandro izahay mandra-pahadiovan'ilay trano."
          },
          {
            "english": "It took us 6 weeks before we got the house clean.",
            "malagasy": "Naharitra 6 herinandro izahay vao nahadio ilay trano."
          },
          {
            "english": "It took him 20 minutes until he watered all the plants.",
            "malagasy": "Naharitra 20 minitra izy mandra-pahavitany nanondraka ny zavamaniry rehetra."
          },
          {
            "english": "It took him 3 hours before he finished the book.",
            "malagasy": "Naharitra adiny 3 izy vao nahavita ilay boky."
          }
        ]
      },
      {
        "id": "ch3-l1-c7",
        "type": "note",
        "title": "Ahoana no hisafidianana ny firafitra?",
        "malagasyExplanation": "Safidio ny person + take rehefa olona no tena resahina; activity + take rehefa hetsika no lohahevitra; object + take rehefa zavatra iray no mandany fotoana; ary It + take rehefa fanambarana ankapobeny no ilaina. Aza afangaro ny take sy ny fotoana: ny singa manondro faharetana dia apetraka aorian'ny take.",
        "examples": [
          {
            "english": "I took 3 hours to get home. → The journey took me 3 hours. → It took me 3 hours to get home.",
            "malagasy": "Ireo fehezanteny telo ireo dia milaza hevitra iray ihany, saingy miova izay asongadina: ilay olona, ilay dia, na ilay toe-javatra ankapobeny."
          }
        ]
      },
      {
        "id": "ch3-l1-c8",
        "type": "note",
        "title": "Hafatra famaranana",
        "malagasyExplanation": "Ny fianarana teny anglisy dia dingana mila faharetana. Ny hoe take your time dia midika hoe aza maika; omeo fotoana ampy ny tenanao hanaovana zavatra tsara.",
        "examples": [
          {
            "english": "Don't forget to take your time studying English!",
            "malagasy": "Aza adino ny tsy maika rehefa mianatra teny anglisy!"
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l2",
    "chapterId": "ch3",
    "title": "5 Idioms with Transportation",
    "subtitle": "Idiôma 5 momba ny fitaterana sy ny toe-javatra iainana",
    "duration": "10 min",
    "cards": [
      {
        "id": "ch3-l2-c1",
        "type": "vocabulary",
        "title": "Mora rehefa efa hainao",
        "examples": [
          {
            "english": "Something is just like riding a bike",
            "malagasy": "Mora be ianarana; rehefa hainao dia mora averina atao.",
            "example": "Ballroom dancing is just like riding a bike"
          }
        ]
      },
      {
        "id": "ch3-l2-c2",
        "type": "vocabulary",
        "title": "Very ny hevitra noresahina",
        "examples": [
          {
            "english": "To lose your train of thought",
            "malagasy": "Manadino izay noresahinao na very tampoka ny tohiny.",
            "example": "What was I saying? I lost my train of thought!"
          }
        ]
      },
      {
        "id": "ch3-l2-c3",
        "type": "vocabulary",
        "title": "Mametraka olon-kafa ho voa",
        "examples": [
          {
            "english": "To throw somebody under the bus",
            "malagasy": "Manao zavatra manimba olona iray mba hahazoana tombontsoa ho anao.",
            "example": "I’m not throwing my colleague under the bus for $100!"
          }
        ]
      },
      {
        "id": "ch3-l2-c4",
        "type": "vocabulary",
        "title": "Manao zavatra mampidi-doza",
        "examples": [
          {
            "english": "To be walking on thin ice",
            "malagasy": "Manao zavatra tena mampidi-doza na be risika.",
            "example": "You are walking on thin ice by coming late, next time you will be fired"
          }
        ]
      },
      {
        "id": "ch3-l2-c5",
        "type": "vocabulary",
        "title": "Ao anatin’ny olana mitovy",
        "examples": [
          {
            "english": "To be in the same boat",
            "malagasy": "Ao anatin’ny toe-javatra ratsy na olana mitovy amin’ny an’olon-kafa.",
            "example": "My friend failed history, and I will be in the same boat if I don’t study"
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l3",
    "chapterId": "ch3",
    "title": "10 Fun & Useful Idioms",
    "subtitle": "Idiôma anglisy 10 mahafinaritra sy ilaina, miaraka amin’ny heviny amin’ny teny malagasy",
    "duration": "15 min",
    "cards": [
      {
        "id": "ch3-l3-c1",
        "type": "vocabulary",
        "title": "Mahatsapa fa misy zavatra tsy mety",
        "examples": [
          {
            "english": "To smell a rat",
            "malagasy": "Mahatsapa na miahiahy fa misy zavatra tsy mety na tsy ara-dalàna.",
            "example": "Hey! The door is open! I’m sure I locked the door before I went shopping. I smell a rat!"
          }
        ]
      },
      {
        "id": "ch3-l3-c2",
        "type": "vocabulary",
        "title": "Mamoaka tsiambaratelo tsy nahy",
        "examples": [
          {
            "english": "To let the cat out of the bag",
            "malagasy": "Mamoaka na mampahafantatra tsiambaratelo noho ny hadisoana na tsy nahy.",
            "example": "He wasn’t supposed to know about the party! But I let the cat out of the bag!"
          }
        ]
      },
      {
        "id": "ch3-l3-c3",
        "type": "vocabulary",
        "title": "Mampahafantatra tsiambaratelo",
        "examples": [
          {
            "english": "To spill the beans",
            "malagasy": "Mamoaka tsiambaratelo na milaza tsiambaratelo amin’olona.",
            "example": "I was planning a surprise birthday party for my mom. But my brother spilled the beans and told her about the party!"
          }
        ]
      },
      {
        "id": "ch3-l3-c4",
        "type": "vocabulary",
        "title": "Mampahatezitra na manelingelina",
        "examples": [
          {
            "english": "To get in your hair",
            "malagasy": "Mampahatezitra na manelingelina olona mafy.",
            "example": "Teaching English to kids is very difficult! Because kids get in your hair!"
          }
        ]
      },
      {
        "id": "ch3-l3-c5",
        "type": "vocabulary",
        "title": "Aza manelingelina ahy",
        "examples": [
          {
            "english": "To get off someone’s back",
            "malagasy": "Mampitsahatra ny fanelingelenana na ny fanerena olona.",
            "example": "Hey! Get off your teacher’s back!"
          },
          {
            "english": "To get off someone’s back",
            "malagasy": "Mampitsahatra ny fanelingelenana na ny fanerena olona.",
            "example": "Why do you keep texting me so much?! Get off my back!"
          }
        ]
      },
      {
        "id": "ch3-l3-c6",
        "type": "vocabulary",
        "title": "Mandeha matory",
        "examples": [
          {
            "english": "To hit the hay",
            "malagasy": "Mandeha matory na mandry.",
            "example": "I’m really tired now, and I want to hit the hay"
          }
        ]
      },
      {
        "id": "ch3-l3-c7",
        "type": "vocabulary",
        "title": "Mandoa na manome an-tery",
        "examples": [
          {
            "english": "To cough up",
            "malagasy": "Manome na mandoa zavatra amin’olona an-tery, tsy araka ny sitrapo.",
            "example": "This morning, I coughed up all the money I had to the guy who was mugging me!"
          },
          {
            "english": "To cough up",
            "malagasy": "Manome na mandoa zavatra amin’olona an-tery, tsy araka ny sitrapo.",
            "example": "I lost a bet, and I had to cough up 50 bucks!"
          }
        ]
      },
      {
        "id": "ch3-l3-c8",
        "type": "vocabulary",
        "title": "Mifamaly soa",
        "examples": [
          {
            "english": "To scratch someone’s back",
            "malagasy": "Manao soa amin’olona, indrindra amin’ny famaliana soa nataony taminao.",
            "example": "So, you want me to teach you English? Ok, only if you join my online English course"
          }
        ]
      },
      {
        "id": "ch3-l3-c9",
        "type": "vocabulary",
        "title": "Manome zavatra na vola",
        "examples": [
          {
            "english": "To fork over",
            "malagasy": "Manolotra na manome zavatra amin’olona, indrindra fa vola.",
            "example": "This morning I had to fork over 20 bucks just for parking my car!"
          }
        ]
      },
      {
        "id": "ch3-l3-c10",
        "type": "vocabulary",
        "title": "Maty",
        "examples": [
          {
            "english": "To kick the bucket",
            "malagasy": "Maty.",
            "example": "The noisy neighbour upstairs kicked the bucket today!"
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l4",
    "chapterId": "ch3",
    "title": "10 English Idioms",
    "subtitle": "Idiôma anglisy 10 sy ny heviny amin'ny teny malagasy",
    "duration": "15 min",
    "cards": [
      {
        "id": "ch3-l4-c1",
        "type": "vocabulary",
        "title": "Miatrika olana sarotra",
        "examples": [
          {
            "english": "To take the bull by the horns",
            "malagasy": "Miatrika sy mamaha mivantana toe-javatra sarotra.",
            "example": "I decided to take the bull by the horns and finish the project"
          }
        ]
      },
      {
        "id": "ch3-l4-c2",
        "type": "vocabulary",
        "title": "Zavatra na olona hafa tanteraka",
        "examples": [
          {
            "english": "A horse of a different color",
            "malagasy": "Zavatra na olona miavaka sy hafa amin'ny hafa.",
            "example": "If she doesn’t text me back, i would let go of her. However, if she does, that’s a horse of a different color!"
          }
        ]
      },
      {
        "id": "ch3-l4-c3",
        "type": "vocabulary",
        "title": "Milalao amin'ny fomba tsy mitandrina",
        "examples": [
          {
            "english": "To horse around",
            "malagasy": "Milalao na mitondra tena amin'ny fomba tsy miraharaha, mitabataba ary adala.",
            "example": "Don’t horse around near the China plates, you may break them!"
          }
        ]
      },
      {
        "id": "ch3-l4-c4",
        "type": "vocabulary",
        "title": "Mampiahiahy",
        "examples": [
          {
            "english": "To be fishy",
            "malagasy": "Mampiahiahy; toa misy zavatra tsy mety.",
            "example": "He is asking me for my driver’s license, but he is not a cop! Something is fishy!"
          }
        ]
      },
      {
        "id": "ch3-l4-c5",
        "type": "vocabulary",
        "title": "Mandoa vola tafahoatra",
        "examples": [
          {
            "english": "To pay through the nose",
            "malagasy": "Mandoa vola mihoatra noho ny tena vidin-javatra iray.",
            "example": "Hey! Be careful with that guitar! I paid through the nose for it!"
          }
        ]
      },
      {
        "id": "ch3-l4-c6",
        "type": "vocabulary",
        "title": "Manao vazivazy amin'olona",
        "examples": [
          {
            "english": "To pull someone’s leg",
            "malagasy": "Milaza zavatra mahagaga, mampanahy na manaitra amin'olona mba hifaliana fotsiny.",
            "example": "Did you really have lunch with the president? or are you just pulling my leg?"
          }
        ]
      },
      {
        "id": "ch3-l4-c7",
        "type": "vocabulary",
        "title": "Mandehana haingana",
        "examples": [
          {
            "english": "To shake a leg",
            "malagasy": "Manafaingana na maika.",
            "example": "We are supposed to finish this project by tomorrow. Shake a leg!"
          }
        ]
      },
      {
        "id": "ch3-l4-c8",
        "type": "vocabulary",
        "title": "Mirary soa",
        "examples": [
          {
            "english": "To break a leg",
            "malagasy": "Mirary soa; teny fanehoana firariantsoa alohan'ny hetsika iray.",
            "example": "Hey! Don’t worry, you are going to be great! Go on stage now, break a leg!"
          }
        ]
      },
      {
        "id": "ch3-l4-c9",
        "type": "vocabulary",
        "title": "Avela ao anatin'ny fahasahiranana",
        "examples": [
          {
            "english": "To leave someone high and dry",
            "malagasy": "Mametraka olona ao anatin'ny toe-javatra sarotra ka miala tsy manampy azy.",
            "example": "My roommate suddenly left the apartment and now I have to look for another roommate. He left me high and dry!"
          }
        ]
      },
      {
        "id": "ch3-l4-c10",
        "type": "vocabulary",
        "title": "Miezaka mafy manampy",
        "examples": [
          {
            "english": "To bend over backwards",
            "malagasy": "Miezaka mafy araka izay azo atao mba hanao soa na hanampy olona.",
            "example": "He is an amazing teacher! He bends over backwards to help his students!"
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l5",
    "chapterId": "ch3",
    "title": "10 English Idioms",
    "subtitle": "Idiôma anglisy: hevitra miafina sy fomba fiteny misy biby",
    "duration": "15 min",
    "cards": [
      {
        "id": "ch3-l5-c1",
        "type": "explanation",
        "title": "Inona no atao hoe idiom?",
        "englishTitle": "ENGLISH IDIOMS",
        "malagasyExplanation": "Ny idiom dia teny iray na fitambaran-teny manana hevitra hafa noho ny hevitra mivantana ananan'ireo teny mandrafitra azy. Ohatra, ny piece of cake dia tsy mofomamy akory fa midika hoe zavatra tena mora atao.",
        "content": "Idioms are words or a group of words that have a meaning different from the direct meaning of the words themselves.",
        "examples": [
          {
            "english": "Something is a piece of cake",
            "malagasy": "Tena mora atao ilay zavatra.",
            "example": "With POC English, learning English is a piece of cake!"
          }
        ]
      },
      {
        "id": "ch3-l5-c2",
        "type": "vocabulary",
        "title": "Miatrika olana sy olona miavaka",
        "examples": [
          {
            "english": "To take the bull by the horns",
            "malagasy": "Miatrika sy mamaha mivantana toe-javatra sarotra.",
            "example": "I decided to take the bull by the horns and finish the project"
          },
          {
            "english": "A horse of a different color",
            "malagasy": "Olona na zavatra hafa tanteraka, tsy mitovy amin'ny hafa.",
            "example": "If she doesn’t text me back, i would let go of her. However, if she does, that’s a horse of a different color!"
          },
          {
            "english": "A horse of a different color",
            "malagasy": "Olona na zavatra hafa tanteraka, tsy mitovy amin'ny hafa.",
            "example": "I can invite Jack and Jessie to the party, but their friend Joey is a horse of a different color!"
          }
        ]
      },
      {
        "id": "ch3-l5-c3",
        "type": "vocabulary",
        "title": "Milalao tsy mitandrina sy mahatsikaritra zavatra mampiahiahy",
        "examples": [
          {
            "english": "To horse around",
            "malagasy": "Milalao na mitondra tena amin'ny fomba tsy mitandrina, mitabataba ary adala.",
            "example": "Don’t horse around near the China plates, you may break them!"
          },
          {
            "english": "To horse around",
            "malagasy": "Milalao na mitondra tena amin'ny fomba tsy mitandrina, mitabataba ary adala.",
            "example": "Hey! Quit horsing around. I’m trying to read a book here!"
          },
          {
            "english": "To be fishy",
            "malagasy": "Mampiahiahy; toa misy zavatra tsy mety.",
            "example": "He is asking me for my driver’s license, but he is not a cop! Something is fishy!"
          },
          {
            "english": "To be fishy",
            "malagasy": "Mampiahiahy; toa misy zavatra tsy mety.",
            "example": "Today I received an Email saying that I have won one million dollars! But, then they asked me to pay twenty dollars for registration. That seems fishy!"
          }
        ]
      },
      {
        "id": "ch3-l5-c4",
        "type": "vocabulary",
        "title": "Mandoa be loatra na manao vazivazy",
        "examples": [
          {
            "english": "To pay through the nose",
            "malagasy": "Mandoa vola mihoatra noho ny tena vidin-javatra iray.",
            "example": "Hey! Be careful with that guitar! I paid through the nose for it!"
          },
          {
            "english": "To pay through the nose",
            "malagasy": "Mandoa vola mihoatra noho ny tena vidin-javatra iray.",
            "example": "Hey! These are the last-minute tickets for the concert. I paid through the nose for them!"
          },
          {
            "english": "To pull someone’s leg",
            "malagasy": "Milaza zavatra mahagaga, manaitra na mampanahy amin'olona mba hifaliana fotsiny.",
            "example": "Did you really have lunch with the president? or are you just pulling my leg?"
          },
          {
            "english": "To pull someone’s leg",
            "malagasy": "Milaza zavatra mahagaga, manaitra na mampanahy amin'olona mba hifaliana fotsiny.",
            "example": "Stop pulling my leg! You didn’t talk to Jeff Bazos!"
          }
        ]
      },
      {
        "id": "ch3-l5-c5",
        "type": "vocabulary",
        "title": "Manafaingana sy mirary soa",
        "examples": [
          {
            "english": "To shake a leg",
            "malagasy": "Manafaingana; milaza amin'olona mba hanao zavatra haingana.",
            "example": "We are supposed to finish this project by tomorrow. Shake a leg!"
          },
          {
            "english": "To shake a leg",
            "malagasy": "Manafaingana; milaza amin'olona mba hanao zavatra haingana.",
            "example": "You aren’t ready yet! The concert begins in 30 minutes! Shake a leg!"
          },
          {
            "english": "To break a leg",
            "malagasy": "Mirary soa, indrindra alohan'ny fampisehoana na fanadinana.",
            "example": "Hey! Don’t worry, you are going to be great! Go on stage now, break a leg!"
          },
          {
            "english": "To break a leg",
            "malagasy": "Mirary soa, indrindra alohan'ny fampisehoana na fanadinana.",
            "example": "You have an exam tomorrow. Alright, break a leg!"
          }
        ]
      },
      {
        "id": "ch3-l5-c6",
        "type": "vocabulary",
        "title": "Avela ao anatin'ny fahasahiranana sy miezaka mafy",
        "examples": [
          {
            "english": "To leave someone high and dry",
            "malagasy": "Mametraka olona ao anatin'ny toe-javatra sarotra ka miala tsy manampy azy.",
            "example": "My roommate suddenly left the apartment and now I have to look for another roommate. He left me high and dry!"
          },
          {
            "english": "To leave someone high and dry",
            "malagasy": "Mametraka olona ao anatin'ny toe-javatra sarotra ka miala tsy manampy azy.",
            "example": "Don’t worry, I’m not gonna leave you high and dry, I’ll help you"
          },
          {
            "english": "To bend over backwards",
            "malagasy": "Miezaka mafy araka izay azo atao mba hanao soa na hanampy olona.",
            "example": "He is an amazing teacher! He bends over backwards to help his students!"
          },
          {
            "english": "To bend over backwards",
            "malagasy": "Miezaka mafy araka izay azo atao mba hanao soa na hanampy olona.",
            "example": "Their father bent over backwards to help them get into college!"
          }
        ],
        "malagasyExplanation": "Past form: bend → bent."
      },
      {
        "id": "ch3-l5-c7",
        "type": "vocabulary",
        "title": "Matory vetivety",
        "examples": [
          {
            "english": "To take / have a catnap",
            "malagasy": "Matory kely mandritra ny 15 na 20 minitra.",
            "example": "I always take a catnap after lunch."
          }
        ]
      },
      {
        "id": "ch3-l5-c8",
        "type": "vocabulary",
        "title": "Manao risika ho tombontsoan'ny vondrona",
        "examples": [
          {
            "english": "To bell the cat",
            "malagasy": "Manao zavatra sarotra na mampidi-doza izay mety hahasoa vondron'olona.",
            "example": "I think you should bell the cat! Boss likes you the most!"
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l6",
    "chapterId": "ch3",
    "title": "Idioms & Vocabulary with Death",
    "subtitle": "Voambolana sy fomba fiteny momba ny fahafatesana",
    "duration": "15 min",
    "cards": [
      {
        "id": "ch3-l6-c1",
        "type": "vocabulary",
        "title": "Toerana sy ny hevitra hoe maty",
        "examples": [
          {
            "english": "Cemetery (n)",
            "malagasy": "Fasana; toerana handevenana ny olona maty.",
            "example": "When people die they are buried in the cemetery"
          },
          {
            "english": "Die (v)",
            "malagasy": "Maty; tsy velona intsony.",
            "example": "We all die in the end"
          }
        ]
      },
      {
        "id": "ch3-l6-c2",
        "type": "vocabulary",
        "title": "Dead: olona sy finday",
        "examples": [
          {
            "english": "Dead (adj) — for humans",
            "malagasy": "Maty: olona efa nodimandry.",
            "example": "She is dead / He is dead / They are dead"
          },
          {
            "english": "Dead (adj) — for cellphones",
            "malagasy": "Lany tanteraka ny herin'ny batterie ka tsy misy charge intsony.",
            "example": "My cellphone is dead"
          }
        ]
      },
      {
        "id": "ch3-l6-c3",
        "type": "vocabulary",
        "title": "Fandevenana sy alahelo",
        "examples": [
          {
            "english": "Funeral (n)",
            "malagasy": "Fandevenana: fotoana itondrana ny olona maty any amin'ny fasana sy andevenana azy.",
            "example": ""
          },
          {
            "english": "To mourn for somebody",
            "malagasy": "Malahelo na mitomany noho ny fahafatesan'olona iray.",
            "example": ""
          }
        ]
      },
      {
        "id": "ch3-l6-c4",
        "type": "vocabulary",
        "title": "Mihady sy mandevina",
        "examples": [
          {
            "english": "To dig",
            "malagasy": "Mihady; manokatra ny tany amin'ny fitaovana na amin'ny tanana.",
            "example": ""
          },
          {
            "english": "To bury something",
            "malagasy": "Mihady tany, mametraka zavatra ao anatiny, ary mandrakotra azy indray.",
            "example": ""
          }
        ]
      },
      {
        "id": "ch3-l6-c5",
        "type": "vocabulary",
        "title": "Fomba fiteny milaza hoe maty",
        "examples": [
          {
            "english": "To kick the bucket",
            "malagasy": "Maty; fomba fiteny tsy ara-dalàna milaza fahafatesana.",
            "example": "My grandfather kicked the bucket 5 years ago"
          },
          {
            "english": "To pass away",
            "malagasy": "Nodimandry na maty; fomba fiteny malefaka sy ara-dalàna kokoa.",
            "example": "My grandparents passed away 6 years ago"
          }
        ]
      },
      {
        "id": "ch3-l6-c6",
        "type": "vocabulary",
        "title": "Aretina mafy sy zava-dehibe faran'izay betsaka",
        "examples": [
          {
            "english": "To be at death's door",
            "malagasy": "Marary mafy dia mafy, toy ny efa eo am-bavahadin'ny fahafatesana.",
            "example": "I'm really sad, because I think my grandpa is at death's door"
          },
          {
            "english": "To be a matter of life and death",
            "malagasy": "Tena zava-dehibe, toy ny miankina amin'izany ny aina.",
            "example": "This Monday I have a very important job interview, and this job interview to me is a matter of life and death"
          }
        ]
      },
      {
        "id": "ch3-l6-c7",
        "type": "vocabulary",
        "title": "Fandavana mafy sy hafaliana ratsy",
        "examples": [
          {
            "english": "Over my dead body",
            "malagasy": "Tsy azo atao mihitsy; tsy hanaiky na amin'ny toe-javatra inona na inona aho.",
            "example": "You are going to sell my car? Over my dead body"
          },
          {
            "english": "To dance on somebody's grave",
            "malagasy": "Faly noho ny fahafatesan'olona iray, na mankalaza izany amin'ny fomba ratsy.",
            "example": ""
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l7",
    "chapterId": "ch3",
    "title": "5 Idioms with Food",
    "subtitle": "Fomba fiteny 5 momba ny sakafo",
    "duration": "15 min",
    "cards": [
      {
        "id": "ch3-l7-c1",
        "type": "explanation",
        "title": "Inona no atao hoe idiom?",
        "englishTitle": "IDIOMS WITH FOOD",
        "malagasyExplanation": "Ny idiom dia vondron-teny manana hevitra hafa noho ny hevitr'ireo teny tsirairay rehefa raisina misaraka. Ao amin'ity lesona ity dia ianarana ireo fomba fiteny dimy mifandray amin'ny sakafo."
      },
      {
        "id": "ch3-l7-c2",
        "type": "vocabulary",
        "title": "Tsy zavatra tiana",
        "examples": [
          {
            "english": "Something is not my cup of tea",
            "malagasy": "Tsy tiako na tsy mahaliana ahy ny zavatra iray; matetika ampiasaina amin'ny endrika fandavana.",
            "example": "A: Do you wanna go skiing this weekend?\nB: No! Not really! Skiing is not my cup of tea!"
          },
          {
            "english": "Something is not my cup of tea",
            "malagasy": "Tsy tena zavatra mahaliana na tian'ny olona iray.",
            "example": "A: Cool guitar! You must love music! Don’t you?\nB: Not really! My roommate plays the guitar.\nIn fact, music is not really my cup of tea!"
          }
        ]
      },
      {
        "id": "ch3-l7-c3",
        "type": "vocabulary",
        "title": "Aza malahelo amin'ny zavatra tsy azo ovaina",
        "examples": [
          {
            "english": "To cry over spilled milk",
            "malagasy": "Malahelo na tezitra noho ny zavatra ratsy efa nitranga nefa tsy azo ovaina intsony.",
            "example": "A: Oh, man! If only I had studied harder!\nB: Well, you can’t go back in time! Can you?\nA: Oh, no! Of course not!\nB: So, don’t cry over spilled milk! Focus on the future!"
          }
        ]
      },
      {
        "id": "ch3-l7-c4",
        "type": "vocabulary",
        "title": "Zavatra na olona sarotra",
        "examples": [
          {
            "english": "A hard nut / a tough nut (to crack)",
            "malagasy": "Olona sarotra ifampiraharahana na takarina; azo ampiasaina koa amin'ny zavatra sarotra vahana na takarina.",
            "example": "A: Do you think you can get him to agree to the contract?\nB: I don’t know! I’ll do my best.\nHe is a hard nut to crack!"
          },
          {
            "english": "A hard nut / a tough nut (to crack)",
            "malagasy": "Olana na zavatra sarotra atrehina na takarina.",
            "example": "A: So, what do you think we should do?\nB: I don’t know! This problem is a hard nut to crack!"
          }
        ]
      },
      {
        "id": "ch3-l7-c5",
        "type": "vocabulary",
        "title": "Zavatra mora atao",
        "examples": [
          {
            "english": "Something is a piece of cake",
            "malagasy": "Zavatra tena mora atao; mora be ny manatanteraka azy.",
            "example": "A: I have a job interview tomorrow. And I am very nervous!\nB: Don’t worry! I’m sure the job interview will be a piece of cake!"
          }
        ]
      },
      {
        "id": "ch3-l7-c6",
        "type": "vocabulary",
        "title": "Loharanom-bola lehibe",
        "examples": [
          {
            "english": "Bread & butter",
            "malagasy": "Loharanom-bola lehibe na asa tena iankinan'ny fiveloman'olona.",
            "example": "A: What does he do for a living?\nB: He does many things! But acting is his bread & butter!"
          },
          {
            "english": "Bread & butter",
            "malagasy": "Asa na zavatra tena fototry ny fidiram-bolan'ny olona iray.",
            "example": "A: Tell me about your job!\nB: These days I’m working in a company. But before that\nmy bread & butter was teaching!"
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l8",
    "chapterId": "ch3",
    "title": "Phrasal Verbs for Arguments and Disagreeing",
    "subtitle": "Phrasal verbs momba ny fifamaliana sy ny tsy fifanarahana",
    "duration": "15 min",
    "cards": [
      {
        "id": "ch3-l8-c1",
        "type": "explanation",
        "title": "Fomba fiteny amin'ny adihevitra",
        "englishTitle": "ARGUMENTS & DISAGREEING",
        "malagasyExplanation": "Ny phrasal verb dia matoanteny arahina preposition na adverb ka mamorona hevitra iray. Ity lesona ity dia mampianatra fomba fiteny ampiasaina rehefa misy fifamaliana, fanohanana, fanakianana, na fanekena zavatra tsy nekena tany am-boalohany."
      },
      {
        "id": "ch3-l8-c2",
        "type": "vocabulary",
        "title": "Misaraka noho ny adihevitra",
        "examples": [
          {
            "english": "To fall out with somebody",
            "malagasy": "Tsy hifandray na tsy hifankahazo intsony amin'olona noho ny fifamaliana; misaraka aminy.",
            "example": "I had a fight with my friend and we fell out."
          },
          {
            "english": "To fall out with somebody",
            "malagasy": "Tsy hifandray na tsy hifankahazo intsony amin'olona noho ny fifamaliana; misaraka aminy.",
            "example": "She was my friend but we fell out after what she did."
          },
          {
            "english": "To fall out with somebody",
            "malagasy": "Tsy hifandray na tsy hifankahazo intsony amin'olona noho ny fifamaliana; misaraka aminy.",
            "example": "I fell out with Jack because he kept texting my girlfriend."
          }
        ]
      },
      {
        "id": "ch3-l8-c3",
        "type": "vocabulary",
        "title": "Mijoro miray hina",
        "examples": [
          {
            "english": "To stick together",
            "malagasy": "Mitoetra ho miray hina sy matanjaka; mifanohana.",
            "example": "I knew it’s a very tough time, but as a family we have to stick together."
          },
          {
            "english": "To stick together",
            "malagasy": "Mitoetra ho miray hina sy matanjaka; mifanohana.",
            "example": "It is a difficult project, but if we stick together we can do it."
          }
        ]
      },
      {
        "id": "ch3-l8-c4",
        "type": "vocabulary",
        "title": "Manambany olona",
        "examples": [
          {
            "english": "To put somebody down",
            "malagasy": "Manakiana na manambany olona mba hahatonga azy hahatsiaro tena ho ratsy na tsy manan-danja.",
            "example": "I hate my boss, he puts me down all the time!"
          },
          {
            "english": "To put somebody down",
            "malagasy": "Manakiana na manambany olona mba hahatonga azy hahatsiaro tena ho ratsy na tsy manan-danja.",
            "example": "Why did you put me down in front of all those people?"
          }
        ]
      },
      {
        "id": "ch3-l8-c5",
        "type": "vocabulary",
        "title": "Miaro olona eo anatrehan'ny hafa",
        "examples": [
          {
            "english": "To stick up for somebody",
            "malagasy": "Mijoro miaro na manohana olona eo anatrehan'ny olon-kafa.",
            "example": "Your friend will stick up for you."
          },
          {
            "english": "To stick up for somebody",
            "malagasy": "Mijoro miaro na manohana olona eo anatrehan'ny olon-kafa.",
            "example": "Don’t worry! She will try to put you down, but I will stick up for you."
          },
          {
            "english": "To stick up for somebody",
            "malagasy": "Mijoro miaro na manohana olona eo anatrehan'ny olon-kafa.",
            "example": "I don’t need your help, I will stick up for myself!"
          }
        ]
      },
      {
        "id": "ch3-l8-c6",
        "type": "vocabulary",
        "title": "Manaiky na milefitra farany",
        "examples": [
          {
            "english": "To give in",
            "malagasy": "Manaiky farany zavatra iray izay tsy nekena tamin'ny voalohany; milefitra.",
            "example": "Finally, your father gave in and he will buy you a laptop!"
          },
          {
            "english": "To give in",
            "malagasy": "Manaiky farany zavatra iray izay tsy nekena tamin'ny voalohany; milefitra.",
            "example": "Keep asking and he will finally give in."
          },
          {
            "english": "To give in",
            "malagasy": "Manaiky farany zavatra iray izay tsy nekena tamin'ny voalohany; milefitra.",
            "example": "My child kept crying all day for that bike. I gave in and I bought it for him!"
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l9",
    "chapterId": "ch3",
    "title": "Phrasal Verbs for Plans and Decisions",
    "subtitle": "Phrasal verbs momba ny drafitra sy ny fanapahan-kevitra",
    "duration": "15 min",
    "cards": [
      {
        "id": "ch3-l9-c1",
        "type": "explanation",
        "title": "Miresaka drafitra sy fanapahan-kevitra",
        "englishTitle": "PLANS & DECISIONS",
        "malagasyExplanation": "Ny phrasal verb dia fitambaran'ny matoanteny sy teny manaraka azy, ka mamorona hevitra manokana. Ity lesona ity dia manazava ireo phrasal verbs ampiasaina rehefa miandry sy mandinika safidy, mikasa ny ho avy, mangataka hevitra, na misalasala hanao zavatra."
      },
      {
        "id": "ch3-l9-c2",
        "type": "vocabulary",
        "title": "Miandry vao manapa-kevitra",
        "examples": [
          {
            "english": "To sleep on something",
            "malagasy": "Miandry sy mieritreritra zavatra iray aloha vao mandray fanapahan-kevitra.",
            "example": "If you are not sure whether to sell your headphones or not, you can sleep on it."
          }
        ]
      },
      {
        "id": "ch3-l9-c3",
        "type": "vocabulary",
        "title": "Miaina tsy misy zavatra iray",
        "examples": [
          {
            "english": "To do without something",
            "malagasy": "Miaina na mahavita zavatra iray tsy mampiasa na tsy manana zavatra ilaina iray.",
            "example": "I would never sell my phone, because I can’t do without my phone."
          }
        ]
      },
      {
        "id": "ch3-l9-c4",
        "type": "vocabulary",
        "title": "Mandanjalanja ny safidy",
        "examples": [
          {
            "english": "To weigh up something",
            "malagasy": "Mandinika ny lafy tsara sy ny lafy ratsin'ny zavatra iray, avy eo mandanjalanja hoe iza no matanjaka kokoa.",
            "example": "I have been offered a job in a new town. I need to weigh it up carefully."
          }
        ]
      },
      {
        "id": "ch3-l9-c5",
        "type": "vocabulary",
        "title": "Mangataka hevitra amin'olona",
        "examples": [
          {
            "english": "To run something by somebody",
            "malagasy": "Milaza amin'olona iray ny zava-mitranga mba hangataka ny heviny na ny toroheviny.",
            "example": "You’d better run this issue by your family."
          }
        ]
      },
      {
        "id": "ch3-l9-c6",
        "type": "vocabulary",
        "title": "Mikasa mialoha",
        "examples": [
          {
            "english": "To think ahead / to plan ahead",
            "malagasy": "Mieritreritra sy mikasa mialoha ny zava-mitranga, indrindra izay tiana hatao amin'ny ho avy.",
            "example": "When you want to immigrate to another country, you have to think and plan ahead."
          }
        ]
      },
      {
        "id": "ch3-l9-c7",
        "type": "vocabulary",
        "title": "Mandinika ny lafiny rehetra",
        "examples": [
          {
            "english": "To think something over",
            "malagasy": "Mieritreritra ny lafiny rehetra amin'ny zavatra iray alohan'ny handraisana fanapahan-kevitra.",
            "example": "If you want to invest all your money in a new company, stop and think it over."
          }
        ]
      },
      {
        "id": "ch3-l9-c8",
        "type": "vocabulary",
        "title": "Mandinika ny vokatra mety hitranga",
        "examples": [
          {
            "english": "To think through",
            "malagasy": "Mandinika ireo vokatra na vokatra ratsy mety hateraky ny fanapahan-kevitra iray.",
            "example": "He wants to make a huge investment, so he is thinking through this decision."
          }
        ]
      },
      {
        "id": "ch3-l9-c9",
        "type": "vocabulary",
        "title": "Manantena zavatra hitranga",
        "examples": [
          {
            "english": "To bargain for something",
            "malagasy": "Manantena na mihevitra fa hisy zavatra iray hitranga.",
            "example": "I didn’t bargain for it = I didn’t expect this to happen."
          }
        ]
      },
      {
        "id": "ch3-l9-c10",
        "type": "vocabulary",
        "title": "Mihemotra noho ny tahotra",
        "examples": [
          {
            "english": "To chicken out",
            "malagasy": "Mitsahatra tsy hanao zavatra amin'ny fotoana farany satria matahotra.",
            "example": "I wanted to do bungee jumping, but I chickened out and quit!"
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l10",
    "chapterId": "ch3",
    "title": "Phrasal Verbs to Talk About Problems & Solutions",
    "subtitle": "Phrasal verbs momba ny olana sy ny vahaolana",
    "duration": "15 min",
    "cards": [
      {
        "id": "ch3-l10-c1",
        "type": "explanation",
        "title": "Miresaka olana sy vahaolana",
        "englishTitle": "PROBLEMS & SOLUTIONS",
        "malagasyExplanation": "Ny phrasal verb dia fitambaran'ny matoanteny sy preposition izay mamorona hevitra manokana. Ity lesona ity dia mampianatra fomba fiteny ampiasaina hiresahana olana, hiatrehana izany, ary hitadiavana vahaolana."
      },
      {
        "id": "ch3-l10-c2",
        "type": "vocabulary",
        "title": "Miresaka olana mba hahazoana torohevitra",
        "examples": [
          {
            "english": "To talk something over",
            "malagasy": "Miresaka olana iray amin'olona hafa mba hahafantarana ny heviny na hangatahana torohevitra.",
            "example": "I would like to talk it over with my wife first."
          },
          {
            "english": "To talk something over",
            "malagasy": "Mifanakalo hevitra momba ny zavatra iray alohan'ny handraisana fanapahan-kevitra.",
            "example": "Employees had 2 weeks to talk the proposal over with their families before making a decision."
          }
        ]
      },
      {
        "id": "ch3-l10-c3",
        "type": "vocabulary",
        "title": "Mamaha olana",
        "examples": [
          {
            "english": "To sort something out",
            "malagasy": "Mamaha olana iray amin'ny fomba mahomby.",
            "example": "My laptop has a problem and I have to sort it out."
          },
          {
            "english": "To sort something out",
            "malagasy": "Mamita na mamaha olana maromaro amin'ny fomba mahomby.",
            "example": "We had a productive meeting, I felt we sorted out a lot of problems!"
          }
        ]
      },
      {
        "id": "ch3-l10-c4",
        "type": "vocabulary",
        "title": "Miatrika olana na olona",
        "examples": [
          {
            "english": "To deal with somebody / something",
            "malagasy": "Manao izay ilaina mba hanandramana hamaha na hifehezana olana iray.",
            "example": "It it a very difficult situation, but I have to deal with it!"
          },
          {
            "english": "To deal with somebody / something",
            "malagasy": "Miatrika na mamaha raharaha mifandray amin'olona iray.",
            "example": "Don’t worry about Jake, I will deal with him myself!"
          }
        ]
      },
      {
        "id": "ch3-l10-c5",
        "type": "vocabulary",
        "title": "Manaiky fa misy olana",
        "examples": [
          {
            "english": "To face up to something",
            "malagasy": "Manaiky fa misy olana na toe-javatra sarotra tokony hatrehina.",
            "example": "She has to face up to the fact that he is guilty."
          },
          {
            "english": "To face up to something",
            "malagasy": "Miatrika amin'ny fahitsiana ny zava-misy iray, na dia sarotra aza izany.",
            "example": "They will never offer you another job. You might as well face up to it."
          }
        ]
      },
      {
        "id": "ch3-l10-c6",
        "type": "vocabulary",
        "title": "Mitady hevitra na vahaolana",
        "examples": [
          {
            "english": "To come up with something",
            "malagasy": "Mieritreritra hevitra na vahaolana vaovao, na mitady fomba hamahana olana.",
            "example": "We have been asked to come up with some new ideas."
          },
          {
            "english": "To come up with something",
            "malagasy": "Mamolavola na manolotra vahaolana tsara kokoa ho an'ny olana iray.",
            "example": "Is that the best you can do? You have to come up with a better solution."
          }
        ]
      },
      {
        "id": "ch3-l10-c7",
        "type": "vocabulary",
        "title": "Mampihena safidy",
        "examples": [
          {
            "english": "To narrow something down",
            "malagasy": "Mampihena tsikelikely ny lisitra amin'ny fanesorana ireo safidy tsy ilaina na ratsy kokoa.",
            "example": "Well, 20? that’s a lot of solutions! You have to narrow it down to less than 5."
          },
          {
            "english": "To narrow something down",
            "malagasy": "Mampihena lisitra lava ho safidy vitsy kokoa sy mora isafidianana.",
            "example": "That is quite a long list. You have to narrow it down."
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l11",
    "chapterId": "ch3",
    "title": "Phrasal Verbs to Talk About Student Life",
    "subtitle": "Phrasal verbs hiresahana ny fiainan'ny mpianatra",
    "duration": "20 min",
    "cards": [
      {
        "id": "ch3-l11-c1",
        "type": "explanation",
        "title": "Voambolana ho an'ny fiainan'ny mpianatra",
        "englishTitle": "Student-life phrasal verbs",
        "malagasyExplanation": "Ny phrasal verbs amin'ity lesona ity dia manampy anao hiresaka momba ny fianarana, ny famerenana lesona ary ny fanomanana fanadinana. Ny heviny dia tokony hianarana miaraka amin'ny toe-javatra ampiasana azy, fa tsy amin'ny teny tsirairay fotsiny.",
        "content": "Eight phrasal verbs for keeping up with studies, reviewing, cramming, passing exams, improving skills, and learning naturally."
      },
      {
        "id": "ch3-l11-c2",
        "type": "vocabulary",
        "title": "Mianatra tsy tapaka",
        "englishTitle": "Keep up with something",
        "examples": [
          {
            "english": "to keep up with something / to keep up with your studies",
            "malagasy": "Manohy manao zavatra; amin'ny fianarana, mianatra tsy tapaka mandritra ny taom-pianarana fa tsy mamela ny lesona rehetra ho amin'ny alina alohan'ny fanadinana.",
            "example": "Try to keep up with the training."
          }
        ]
      },
      {
        "id": "ch3-l11-c3",
        "type": "vocabulary",
        "title": "Mamerina lesona efa nianarana",
        "englishTitle": "Brush up on something",
        "examples": [
          {
            "english": "to brush up on something",
            "malagasy": "Mamerina sy manavao fahalalana iray nianarana taloha nefa mety efa hadino.",
            "example": "You should brush up on the vocabulary that you learned before."
          },
          {
            "english": "to brush up on something",
            "malagasy": "Mamerina fahalalana taloha amin'ny alalan'ny famakiana na fanazaran-tena.",
            "example": "Read some books and brush up on your history."
          }
        ]
      },
      {
        "id": "ch3-l11-c4",
        "type": "vocabulary",
        "title": "Zavatra miseho amin'ny fanadinana",
        "englishTitle": "Something comes up in the exam",
        "examples": [
          {
            "english": "Something comes up in the exam",
            "malagasy": "Misy lohahevitra na fanontaniana apetraka amin'ny fanadinana ka mila valiana.",
            "example": "I’m sure this subject will come up in the exam tomorrow."
          }
        ]
      },
      {
        "id": "ch3-l11-c5",
        "type": "vocabulary",
        "title": "Mianatra haingana alohan'ny fanadinana",
        "englishTitle": "Mug up on something",
        "examples": [
          {
            "english": "to mug up on something",
            "malagasy": "Miezaka mianatra haingana ny hevi-dehibe amin'ny zavatra iray, matetika ny alina alohan'ny fanadinana.",
            "example": "When I don’t have time, I only mug up on key points of every chapter."
          }
        ]
      },
      {
        "id": "ch3-l11-c6",
        "type": "vocabulary",
        "title": "Mandalo zara raha",
        "englishTitle": "Scrape through",
        "examples": [
          {
            "english": "to scrape through",
            "malagasy": "Mahavita na mandalo zavatra iray amin'ny fahombiazana kely indrindra, toy ny mandalo fanadinana amin'ny naoty ambany indrindra.",
            "example": "I didn’t study for the exam, I just scraped through."
          }
        ]
      },
      {
        "id": "ch3-l11-c7",
        "type": "vocabulary",
        "title": "Mianatra betsaka araka izay azo atao",
        "englishTitle": "Swot up on something",
        "examples": [
          {
            "english": "to swot up on something",
            "malagasy": "Mianatra sy mitahiry fahalalana betsaka araka izay azo atao momba ny lohahevitra iray.",
            "example": "She is at home, swotting up on her math exam."
          }
        ]
      },
      {
        "id": "ch3-l11-c8",
        "type": "vocabulary",
        "title": "Manatsara fahalalana",
        "englishTitle": "Polish up something",
        "examples": [
          {
            "english": "to polish up something",
            "malagasy": "Manao fanazaran-tena sy manatsara ny fahalalana na fahaizana momba ny zavatra iray.",
            "example": "He is polishing up on his German."
          }
        ]
      },
      {
        "id": "ch3-l11-c9",
        "type": "vocabulary",
        "title": "Mianatra amin'ny fihainoana sy fandraisana",
        "englishTitle": "Pick up on something",
        "examples": [
          {
            "english": "to pick up on something",
            "malagasy": "Mianatra zavatra amin'ny fihainoana sy fandraisana azy tsikelikely, fa tsy amin'ny fianarana sy famakiana mivantana.",
            "example": "Sarah picked up her English when she was living in Canada."
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-l12",
    "chapterId": "ch3",
    "title": "Phrasal Verbs for Traveling",
    "subtitle": "Phrasal verbs ampiasaina rehefa miresaka dia sy fitsangatsanganana",
    "duration": "20 min",
    "cards": [
      {
        "id": "ch3-l12-c1",
        "type": "explanation",
        "title": "Dingana amin'ny dia iray",
        "englishTitle": "Travel phrasal verbs",
        "malagasyExplanation": "Ireo phrasal verbs ireo dia manaraka ny fizotry ny dia: manao veloma amin'ny mpandeha, manomboka ny dia, miditra sy mivoaka amin'ny fitaterana, mandray na mametraka mpandeha, ary misoratra ao amin'ny hotely.",
        "content": "Learn each expression with the kind of transport or travel situation where it naturally belongs."
      },
      {
        "id": "ch3-l12-c2",
        "type": "vocabulary",
        "title": "Manao veloma amin'ny mpandeha",
        "englishTitle": "To see somebody off",
        "examples": [
          {
            "english": "to see somebody off",
            "malagasy": "Mandeha any amin'ny seranam-piaramanidina na gara mba hanao veloma olona iray izay handeha.",
            "example": "They have gone to the airport to see their son off."
          }
        ]
      },
      {
        "id": "ch3-l12-c3",
        "type": "vocabulary",
        "title": "Manomboka ny dia",
        "englishTitle": "To set off (for a place)",
        "examples": [
          {
            "english": "to set off (for a place)",
            "malagasy": "Manomboka ny dia mankany amin'ny toerana iray.",
            "example": "We set off for Paris at night."
          }
        ]
      },
      {
        "id": "ch3-l12-c4",
        "type": "vocabulary",
        "title": "Miditra amin'ny fitaterana",
        "englishTitle": "To get on / to get in",
        "examples": [
          {
            "english": "to get on the plane / bus / train",
            "malagasy": "Miditra amin'ny fiaramanidina, bisy na lamasinina.",
            "example": "We got on the wrong bus."
          },
          {
            "english": "to get in the car / taxi",
            "malagasy": "Miditra ao anaty fiara na taxi.",
            "example": "We got in the taxi and went to the hotel."
          }
        ]
      },
      {
        "id": "ch3-l12-c5",
        "type": "vocabulary",
        "title": "Miainga sy mivoaka",
        "englishTitle": "To take off / to get off",
        "examples": [
          {
            "english": "to take off",
            "malagasy": "Ho an'ny fiaramanidina: miala amin'ny seranam-piaramanidina ka miainga.",
            "example": "What time is the plane taking off?"
          },
          {
            "english": "to take off",
            "malagasy": "Miainga amin'ny ora iray voafaritra ny fiaramanidina.",
            "example": "Well, that plane is taking off around the midnight."
          },
          {
            "english": "to get off the plane / bus / train",
            "malagasy": "Mivoaka na midina avy amin'ny fiaramanidina, bisy na lamasinina.",
            "example": "We got off the train at around 11."
          }
        ]
      },
      {
        "id": "ch3-l12-c6",
        "type": "vocabulary",
        "title": "Mandray na mametraka mpandeha",
        "englishTitle": "To pick somebody up / to drop somebody off",
        "examples": [
          {
            "english": "to pick somebody up",
            "malagasy": "Mamela olona hiditra ao anaty fiara ary mitondra azy any amin'ny toerana halehany.",
            "example": "The hotel shuttle will pick you up after you get off the plane."
          },
          {
            "english": "to drop somebody off",
            "malagasy": "Mitondra olona any amin'ny toerana iray ary mamela azy eo.",
            "example": "The driver picks you up, takes you to the hotel and drops you off."
          }
        ]
      },
      {
        "id": "ch3-l12-c7",
        "type": "vocabulary",
        "title": "Misoratra ao amin'ny hotely",
        "englishTitle": "To check in at a hotel",
        "examples": [
          {
            "english": "to check in at a hotel",
            "malagasy": "Manome antontan-taratasy hamantarana tena, mandray ny lakile, ary mankany amin'ny efitrano.",
            "example": "When you want to check in at a hotel you need to show your ID card."
          }
        ]
      },
      {
        "id": "ch3-l12-c8",
        "type": "vocabulary",
        "title": "Miala amin'ny hotely",
        "englishTitle": "To check out",
        "examples": [
          {
            "english": "to check out",
            "malagasy": "Miala ao amin'ny hotely, mamerina ny lakile, ary maka indray ny antontan-taratasy famantarana raha ilaina.",
            "example": "The check out was at 12, but we left at 11."
          }
        ]
      },
      {
        "id": "ch3-l12-c9",
        "type": "note",
        "title": "Ampifandraiso amin'ny filaharan'ny dia",
        "englishTitle": "Put the journey in order",
        "malagasyExplanation": "Ao amin'ny tantaran'ny dia, ny mpandeha dia manomboka amin'ny set off, miditra amin'ny fiaramanidina, miandry ny take off, mivoaka rehefa tonga, raisin'ny shuttle, alefa any amin'ny hotely, manao check in, ary manao check out rehefa hody.",
        "content": "A useful travel sequence is: see somebody off → set off → get on → take off → get off → pick somebody up → drop somebody off → check in → check out."
      }
    ]
  },
  {
    "id": "ch3-l13",
    "chapterId": "ch3",
    "title": "3 Steps to Learn English Grammar",
    "subtitle": "Dingana 3 hianarana tsara ny fitsipi-pitenenana anglisy",
    "duration": "25 min",
    "cards": [
      {
        "id": "ch3-l13-c1",
        "type": "explanation",
        "title": "Aza mianatra grammar irery",
        "englishTitle": "Grammar and vocabulary work together",
        "malagasyExplanation": "Tsy tokony hianarana misaraka amin'ny voambolana ny grammar. Rehefa mianatra fitsipi-pitenenana ianao dia ampifandraiso amin'ny teny vaovao, mba hahafantaranao sady ny hevitr'ireo teny no fomba fampiasana azy ao anaty fehezanteny.",
        "content": "English grammar cannot and should not be studied alone. Learn grammar and vocabulary together.",
        "examples": [
          {
            "english": "English grammar cannot and should not be studied alone!",
            "malagasy": "Tsy azo sady tsy tokony hianarana irery ny fitsipi-pitenenana anglisy!"
          },
          {
            "english": "You should always learn grammar and vocabulary together.",
            "malagasy": "Tokony hianatra grammar sy voambolana miaraka foana ianao."
          }
        ]
      },
      {
        "id": "ch3-l13-c2",
        "type": "note",
        "title": "Fantaro ny ampahany amin'ny fehezanteny",
        "englishTitle": "Understand sentence composition",
        "malagasyExplanation": "Ny dingana voalohany dia ny mamantatra izay singa mandrafitra fehezanteny sy ny anjara asan'ny singa tsirairay. Ireto no parts of speech efatra fototra: noun (anarana), verb (matoanteny), adjective (mpamaritra anarana), ary adverb (mpamaritra matoanteny na mpamaritra hafa). Misy koa ny pronoun, preposition, conjunction ary interjection.",
        "content": "Main parts of speech: noun (pencil), verb (play), adjective (beautiful), adverb (beautifully). Other parts: pronouns (he / him), prepositions (of / to / from / at), conjunctions (and / or), interjections (yay / oh / ouch).",
        "examples": [
          {
            "english": "pencil — noun; play — verb; beautiful — adjective; beautifully — adverb",
            "malagasy": "pencil — anarana; play — matoanteny; beautiful — mpamaritra anarana; beautifully — mpamaritra matoanteny"
          }
        ]
      },
      {
        "id": "ch3-l13-c3",
        "type": "explanation",
        "title": "Jereo ny asan'ny verb, adjective ary adverb",
        "englishTitle": "See how the parts of speech combine",
        "malagasyExplanation": "Ny verb no milaza hetsika. Ny adjective no mamaritra noun. Ny adverb kosa afaka mamaritra verb, adjective, na adverb hafa. Rehefa atambatra ireo singa ireo dia lasa mazava sy manankarena kokoa ny fehezanteny.",
        "content": "Verb: describe an action. Adjective: describe nouns. Adverbs can describe a verb, an adjective, or another adverb.",
        "examples": [
          {
            "english": "The driver drives.",
            "malagasy": "Mamily fiara ilay mpamily."
          },
          {
            "english": "The angry driver drives.",
            "malagasy": "Mamily fiara ilay mpamily tezitra."
          },
          {
            "english": "The angry driver drives angrily.",
            "malagasy": "Mamily fiara am-pahatezerana ilay mpamily tezitra."
          },
          {
            "english": "The extremely angry driver drives extremely angrily.",
            "malagasy": "Mamily fiara amin'ny fahatezerana tafahoatra ilay mpamily tena tezitra."
          }
        ]
      },
      {
        "id": "ch3-l13-c4",
        "type": "formula",
        "title": "Voambolana aloha, fampiasana marina avy eo",
        "englishTitle": "Vocabulary builds the materials; grammar builds the sentence",
        "malagasyExplanation": "Rehefa manatsara voambolana ianao dia mahazo nouns, verbs, adjectives ary adverbs maro kokoa. Rehefa manatsara grammar kosa ianao dia mianatra mampiasa ireo parts of speech ireo amin'ny endrika sy filaharana marina.",
        "content": "By improving your vocabulary, you learn nouns, verbs, adjectives, and adverbs. By improving your grammar, you use those parts of speech in a correct form.",
        "examples": [
          {
            "english": "The extremely angry driver drives extremely angrily.",
            "malagasy": "Ny voambolana no manome ireo teny; ny grammar no manampy hametraka azy ireo amin'ny endrika marina ao anaty fehezanteny."
          }
        ]
      },
      {
        "id": "ch3-l13-c5",
        "type": "note",
        "title": "Fantaro ny rafitra 12 tenses",
        "englishTitle": "Learn the tenses",
        "malagasyExplanation": "Misy sokajy telo lehibe ny fotoana amin'ny teny anglisy: past, present ary future. Ny sokajy tsirairay dia manana endrika efatra: simple, continuous/progressive, perfect ary perfect continuous/progressive. Izany no mahatonga tenses 12 amin'ny fitambarany.",
        "content": "The three main tenses are past, present, and future. Each has four forms: simple, continuous / progressive, perfect, and perfect continuous / perfect progressive.",
        "examples": [
          {
            "english": "Present simple: I go to school",
            "malagasy": "Present simple: Mandeha any an-tsekoly aho."
          },
          {
            "english": "Present continuous: I am going to school",
            "malagasy": "Present continuous: Mandeha any an-tsekoly aho izao."
          },
          {
            "english": "Present perfect: I have played tennis",
            "malagasy": "Present perfect: Efa nilalao tennis aho."
          },
          {
            "english": "Present perfect continuous: I have been playing tennis",
            "malagasy": "Present perfect continuous: Efa nilalao tennis nandritra ny fotoana iray aho."
          },
          {
            "english": "Past simple: I went to school",
            "malagasy": "Past simple: Nandeha tany an-tsekoly aho."
          },
          {
            "english": "Past continuous: I was going to school",
            "malagasy": "Past continuous: Nandeha tany an-tsekoly aho tamin'izany fotoana izany."
          },
          {
            "english": "Past perfect: I had played tennis",
            "malagasy": "Past perfect: Efa nilalao tennis aho talohan'izay."
          },
          {
            "english": "Past perfect continuous: I had been playing tennis",
            "malagasy": "Past perfect continuous: Efa nilalao tennis nandritra ny fotoana iray aho talohan'izay."
          },
          {
            "english": "Future simple: I will go to school",
            "malagasy": "Future simple: Handeha any an-tsekoly aho."
          },
          {
            "english": "Future continuous: I will be going to school",
            "malagasy": "Future continuous: Ho eny an-dalana ho any an-tsekoly aho amin'izay."
          },
          {
            "english": "Future perfect: I will have played tennis",
            "malagasy": "Future perfect: Efa nilalao tennis aho amin'ny fotoana ho avy voafaritra."
          },
          {
            "english": "Future perfect continuous: I will have been playing tennis",
            "malagasy": "Future perfect continuous: Efa nilalao tennis nandritra ny fotoana iray aho amin'ny fotoana ho avy voafaritra."
          }
        ]
      },
      {
        "id": "ch3-l13-c6",
        "type": "explanation",
        "title": "Atombohy amin'ny simple tenses",
        "englishTitle": "Start with the essential tenses",
        "malagasyExplanation": "Aza miezaka hifehy ireo tenses 12 indray mandeha. Ianaro aloha ny endrika simple telo: present, past ary future. Avy eo manaova fehezanteny maro amin'ny tsirairay, ary ampitahao ny fiovan'ny matoanteny arakaraka ny fotoana.",
        "content": "Learn the essential tenses first: the present simple, past simple, and future simple. Then make many different sentences with each tense.",
        "examples": [
          {
            "english": "The musician plays the guitar (Present simple)",
            "malagasy": "Mitendry gitara ilay mpitendry mozika (present simple)."
          },
          {
            "english": "Yesterday, the musician played the guitar (Past simple)",
            "malagasy": "Omaly, nitendry gitara ilay mpitendry mozika (past simple)."
          },
          {
            "english": "Tomorrow, the musician will play the guitar (Future simple)",
            "malagasy": "Rahampitso, hitendry gitara ilay mpitendry mozika (future simple)."
          }
        ]
      },
      {
        "id": "ch3-l13-c7",
        "type": "note",
        "title": "Halavao ary afangaro ireo fehezanteny",
        "englishTitle": "Add detail, then mix the tenses",
        "malagasyExplanation": "Rehefa mahafehy ireo simple tenses ianao dia ampio adjectives sy adverbs mba hanankarena ny fehezanteny. Manaraka izany, mianara tsikelikely ny continuous tenses, afangaro ireo enina efa fantatrao, ary manorata tantara fohy. Izany filalaovana amin'ny rafitra izany no manamafy ny fahaizana.",
        "content": "Add adjectives and adverbs to make sentences longer and more creative. Little by little, add new tenses and mix the six tenses you have learned in short stories.",
        "examples": [
          {
            "english": "The very talented musician plays the guitar very beautifully",
            "malagasy": "Mitendry gitara amin'ny fomba tena kanto ilay mpitendry mozika tena manan-talenta."
          },
          {
            "english": "Yesterday, the great musician played the guitar awfully (Past simple)",
            "malagasy": "Omaly, nitendry gitara tamin'ny fomba ratsy ilay mpitendry mozika mahay (past simple)."
          },
          {
            "english": "Tomorrow, the famous musician will play the guitar (Future simple)",
            "malagasy": "Rahampitso, hitendry gitara ilay mpitendry mozika malaza (future simple)."
          },
          {
            "english": "The musician is playing the guitar (Present continuous)",
            "malagasy": "Mitendry gitara ilay mpitendry mozika izao (present continuous)."
          },
          {
            "english": "The musician was playing the guitar (Past continuous)",
            "malagasy": "Nitendry gitara ilay mpitendry mozika tamin'izany fotoana izany (past continuous)."
          },
          {
            "english": "The musician will be playing the guitar (Future continuous)",
            "malagasy": "Ho mbola mitendry gitara ilay mpitendry mozika amin'ny fotoana ho avy (future continuous)."
          },
          {
            "english": "Jack is a famous musician. He plays the guitar masterfully. Yesterday, he was playing the guitar at the concert. He played the guitar beautifully!",
            "malagasy": "Mpitendry mozika malaza i Jack. Mitendry gitara amin'ny fahaizana izy. Omaly, nitendry gitara tao amin'ny kaonseritra izy. Nitendry gitara tamin'ny fomba kanto izy!"
          }
        ]
      },
      {
        "id": "ch3-l13-c8",
        "type": "explanation",
        "title": "Ianaro aloha ny fitsipika tena ilaina",
        "englishTitle": "Start with the essential grammatical rules",
        "malagasyExplanation": "Mila taona maro ny fianarana ny fitsipika anglisy rehetra, ka atombohy amin'ireo tena ilaina: relative clauses, tenses, passive structures, adverbs sy adjectives, quantifiers, conditional sentences, ary infinitives sy gerunds. Fanazaran-tena tena mahomby koa ny mianatra amin'ny fahadisoana grammar mba hampitomboana ny fahamarinan'ny fiteny. Avereno tsikelikely ilay dingana mandra-pahafehezanao azy.",
        "content": "The essentials are relative clauses, tenses, passive structures, adverbs and adjectives, quantifiers, conditional sentences, and infinitives and gerunds. Improve grammatical accuracy by learning from grammatical mistakes.",
        "examples": [
          {
            "english": "After that, try to learn other tenses!",
            "malagasy": "Rehefa vita izany dia andramo ianarana ireo tenses hafa!"
          },
          {
            "english": "When you have played with them enough, you start adding new tenses, parts of speech, vocabulary, adjectives, etc.",
            "malagasy": "Rehefa ampy ny fanazaran-tena nataonao tamin'izy ireo dia manomboka manampy tenses, parts of speech, voambolana ary adjectives vaovao ianao."
          }
        ]
      }
    ]
  }
];
