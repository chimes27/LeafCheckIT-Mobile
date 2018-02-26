import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';


@Component({
  selector: 'page-deficiency-list',
  templateUrl: 'deficiency-list.html'
})
export class DeficiencyListPage {
  selectedItem: any;
  
  title: string[];
  type: string [];
  note: string[];
  desc: string[];
  syn: string[];
  images: string[][];
  ref: string[][];
  items: Array<{ title: string, type: string, desc: string, syn: string, image: string[], ref: string[]}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.title = ['Nitrogen', 'Phosphorus', 'Potassium'];
    this.type = ['Macronutrient','Macronutrient','Macronutrient'];
    this.desc = ['Nitrogen is a nutrient that promotes production of proteins, the main composition of tissues of most living organisms. Without proteins, plants wither and die [1]. In addition, nitrogen is a major component of chlorophyll, a pigment which colors leaves green. The chlorophyll is uniquely capable of converting energy from the sun to transform water, carbon dioxide and mineral as the plant’s only source of food [2]. Though nitrogen is abundant to earth’s atmosphere, is not readily available to be used as nutrient for plants since it follows a production cycle [3].', 'Phosphorus is a nutrient critical the development the strong root system and increased stalk and stem strength for plants [1]. It is also a vital component of Adenosine triphosphate (ATP), an element necessary for plant life processes such as photosynthesis, metabolism of carbohydrates, and the circulation of energy within the plant [2]. The nutrient also helps in developing uniform and early crop maturity, resist stresses and plant diseases, improved flower formation and seed production thus, improving the quality of the crop produced [1].', 'Potassium is a nutrient essential to sustain plant growth and reproduction. It plays several roles in plant nutrition. First, potassium regulates the movement of stomata, controlling the food production of plants. It also serves as a catalyst in enzyme production needed for Adenosine triphosphate (ATP), an important energy source of plants [1]. It also improves the overall health of growing plants by increasing the plant resistance to stresses and drought by regulating the crop’s internal water balance and turgidity and increase the plant’s resistivity to diseases and pest [2].'];
    this.images = [['images/nitro1.jpg', 'images/nitro2.jpg', 'images/nitro3.jpg'],
        ['images/phospo1.jpg', 'images/phospo2.jpg', 'images/phospo3.jpg'],
        ['images/potassium1.png', 'images/potassium2.png', 'images/potassium3.png', 'images/potassium4.png', 'images/potassium5.png']
    ];
    this.syn = ['Nitrogen (N) deficiency symptoms include yellow discoloration of leaves from tip backward older leaves brown. The lower leaves may die prematurely while the top of the plan remains green[4].','Phosphorus deficiency on banana develops chlorosis on the left margin. It shows signs of discoloration to dark bluish green, purpling and browning from the tip backward of the banana leaves [2].', 'Potassium (K) deficiency has several stages and each stage has different manifestations on banana leaves. The first stage of the deficiency starts with leaves turning to yellowish orange color. Necrosis starts at leaf margin is the noticeable symptom of K deficiency on banana. Stage 2 is considered as the moderate stage and is considered as the right time to apply K fertilizer to the plant [11]. On the third stage of the deficiency, the necrosis that started at the leaf edges from the second stage will thicken and will reach the leaf midrib. Almost the entire banana leaf will wither and starts to curl in the fourth stage of the deficiency which is considered as the extreme condition [3]. The last stage of the deficiency, the stage 5 is the lethal stage. The stage will show a total necrosis on the leaf. The leaf will also start to bend pointing towards the base of the plant.' ];

  this.ref = [
  ['1 Mosaic Crop Nutrition. Nitrogen in Plants (Online). Available: http://www.cropnutrition.com/efu-nitrogen.','2 Fact Monster (Online). Available: http://www.factmonster.com/ipka/A0775714.html.','3 The Fertilizer Institute. Nitrogen: Essential to Protein (Online). Available: https://www.tfi.org/introduction-fertilizer/nutrient-science/nitrogen.','4 Haifa Chemicals Ltd. Nutritional Recommendatins for Banana.'],
  ['1 Haifa Chemicals Ltd. Nutritional Recommendatins for Banana.','2 Mosaic Crop Nutrition. Essential Role of Phosphorus in Plants (Online). Available: http://www.cropnutrition.com/efu-phosphorus'],
  ['1 Potassium in plants. SMART! Software Growing Intelligently (Online). Available: http://www.smart-fertilizer.com/articles/potassium-in-plants. Accessed October 2016.','2 Haifa Chemicals Ltd. Nutritional Recommendatins for Banana.','3 Sankar Potassium (K) Deficiency Symptoms. 2011. (Online). Available: Banana: http://tcbanana.blogspot.com/2011/05/k-deficiency-symptoms.html. Accessed October 2016.']
  ];

    this.items = [];

    for(let i=0; i<=this.title.length;i++){
      

      this.items.push({
        title: this.title[i],
        type: this.type[i],
        desc: this.desc[i],
        syn: this.syn[i],
        image: this.images[i],
        ref: this.ref[i]
      })
    }

    
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
