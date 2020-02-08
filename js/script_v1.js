(function () {
  'use strict';

  $(document).ready(function () {

    const bar1_data = [
      { "kg": "Välj önskad vikt i", "lbs": "Välj önskad vikt i", "recipie": "Välj önskad vikt" },
      { "kg": 2.6, "lbs": 5.7, "recipie": ["0,5 kg"] },
      { "kg": 3.6, "lbs": 7.9, "recipie": ["1 kg"] },
      { "kg": 4.1, "lbs": 9.0, "recipie": ["1,25 kg"] },
      { "kg": 4.6, "lbs": 10.1, "recipie": ["1 kg","0,5 kg"] },
      { "kg": 5.1, "lbs": 11.2, "recipie": ["recept"] },
      { "kg": 5.6, "lbs": 12.3, "recipie": ["recept"] },
      { "kg": 6.1, "lbs": 13.4, "recipie": ["recept"] },
      { "kg": 6.6, "lbs": 14.6, "recipie": ["recept"] },
      { "kg": 7.1, "lbs": 15.7, "recipie": ["recept"] },
      { "kg": 7.6, "lbs": 16.8, "recipie": ["recept"] },
      { "kg": 8.1, "lbs": 17.9, "recipie": ["recept"] },
      { "kg": 8.6, "lbs": 19.0, "recipie": ["recept"] },
      { "kg": 9.1, "lbs": 20.1, "recipie": ["recept"] },
      { "kg": 9.6, "lbs": 21.2, "recipie": ["recept"] },
      { "kg": 10.1, "lbs": 22.3, "recipie": ["recept"] },
      { "kg": 10.6, "lbs": 23.4, "recipie": ["recept"] },
      { "kg": 11.1, "lbs": 24.5, "recipie": ["recept"] },
      { "kg": 11.6, "lbs": 25.6, "recipie": ["recept"] }
    ];

    var renderSelect = function () {
      var select = document.getElementById( 'js_input1' ),
      units = document.getElementsByName( 'unit-switch' );
      while ( select.options.length ) {
        select.remove(0);
      }
      var unit = "";
      if( units[0].checked ) {
        unit += units[0].value;
      }
      else {
        unit += units[1].value;
      }
      if( unit == 'kg' ) {
        console.log('kg selected');
      }
      else if ( unit == 'lbs') {
        console.log('lbs selected');
      }
      else {
        console.log('fail');
      }

      /*
const select = document.getElementById( 'the_select' )
const key = document.getElementsByName( 'key-switch' )
const objektArray = [{nick: "hjalle", realname: "Hjalmar", level: "Guru"}, {nick: "jan", realname:"Jan", level: "BOFH"}, {nick: "hugin", realname:"Hugo", level: "n00b"}]
const key = "nick"
const theOptions = []
objektArray.forEach(objekt => theOptions.push( new Option(objekt.level, objekt[key] ) ))
theOptions.forEach((option, i) => option.dataset.realname = objektArray[i].realname )
console.log(theOptions)
*/
      
      //bar1_data.forEach(weight => select.add( new Option( weight[unit] + ' ' + unit, weight[unit] ) ));
      //let default_opt = document.createElement("option");
      //default_opt.value = "";
      //default_opt.text = "Välj vikt";
      //sel.add(opt, sel.options[1]);

      const options = [];
      bar1_data.forEach(weight => options.push( new Option( weight[unit] + ' ' + unit, weight[unit] ) ));
      options.forEach((option, i) => option.dataset.recipie = bar1_data[i].recipie);
      options.forEach((option, i) => option.dataset.id = i);
      //options.unshift( new Option("Välj vikt", "" ));
      //options[0].dataset.recipie = "";
      options.forEach(option => select.add(option));

      /* old-school
      for( var weight in bar1_data ) {
        select.add( new Option( bar1_data[weight][unit] + ' ' + unit, bar1_data[weight].unit ) );
        console.log(bar1_data[weight][unit])
        //console.log(Math.round(bar1_kg[weight] * 2.2046226218 * 10) / 10);
      };
      */
    };

    var showCombination = function () {
      // const destination = $(arguments[0]).siblings('#weight_combo'); // Tried to replace jQuery, but failed.
      const destination = document.getElementById('weight_combo');
      const weight_span = document.createElement('span');
      const weight_value = document.createTextNode(arguments[1]);
      weight_span.appendChild(weight_value);
      //console.log(destination);
      while (destination.firstChild) {
        destination.firstChild.remove();
    }
      destination.append(weight_span);
      //destination.text(arguments[1]);
      //console.log(weight_value);
    };

    $('input[name=unit-switch]').change(function() {
      renderSelect();
    });

    $('select').change(function(evt) {
      let weight = $(evt.currentTarget).find(':selected').data('recipie');;
      let key = $(evt.currentTarget).find(':selected').data('id');
      showCombination(evt.currentTarget, weight, key);
    });

    renderSelect();

  });

}());