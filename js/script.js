(function () {
  'use strict'

  // List of available weights (lacks fixed weight bars)
  const weights = [
    { weight: 5.0, name: '5 kg' },
    { weight: 2.5, name: '2,5 kg' },
    { weight: 1.5, name: '1,5 kg' },
    { weight: 1.25, name: '1,25 kg' },
    { weight: 1.0, name: '1 kg' },
    { weight: 0.5, name: '0,5 kg' }
  ]
  // List of bars
  const bars = [
    { name: 'svart', weight: 1.6, fixed: false },
    { name: 'silver', weight: 1.8, fixed: false },
    { name: 'fast - 2 kg', weight: 2.0, fixed: true },
    { name: 'fast - 3 kg', weight: 3.0, fixed: true },
    { name: 'fast - 6 kg', weight: 6.0, fixed: true }
  ]

  // Some useful elements and stuff
  const the_select = document.querySelector('#all_bars'),
        recipe_div = document.querySelector('#weight_combo_all'),
        total_div = document.querySelector('#total'),
        closest_div = document.querySelector('#closest'),
        input_div = document.querySelector('#input_feedback'),
        custom_input = document.querySelector('#custom_input'),
        unit_radio_lbs = document.querySelector('#unit-radio-one'),
        unit_radio_kg = document.querySelector('#unit-radio-two'),
        all_radios = document.querySelectorAll('.switch input[type="radio"]'),
        bar_radios = document.querySelectorAll('.bar_switch'),
        unit_radios = document.querySelectorAll('.unit_switch'),
        weight_selects = document.querySelectorAll('.weight_select'),
        unit_label = document.querySelector('#unit_label'),
        save_button = document.querySelector('#save_combo'),
        reset_button = document.querySelector('#reset'),
        delete_button_master = document.createElement('span'),
        delete_text = document.createTextNode('x')

  // A delete button element to re-use - not used for now, due to lack of knowledge about event delegation / rebinding
  delete_button_master.classList.add('delete')
  delete_button_master.appendChild(delete_text)

  // Convert weights from kg to g, to circumvent the round-off error crap - but do I really need this now?
  /*
  weights.forEach(weight => {
    weight.weight = weight.weight * 1000
  })

  bars.forEach(bar => {
    bar.weight = bar.weight * 1000
  })
  */

  // Function from https://github.com/jgallen23/combinations/blob/master/index.js
  const getWeightCombos = function(a, max, min) {
    min = min || 1;
    max = max < a.length ? max : a.length;
    var fn = function(n, src, got, all) {
      if (n == 0) {
        if (got.length > 0) {
          all[all.length] = got;
        }
        return;
      }
      for (var j = 0; j < src.length; j++) {
        fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
      }
      return;
    }
    var all = [];
    for (var i = min; i <= max; i++) {
      fn(i, a, [], all);
    }
    if (a.length == max) all.push(a);
    return all;
  }

  let all_combos = []

  // New version handling all bars listed in in-data
  const populateCombosArray = function() { 
    all_combos = []

    const weight_combos = getWeightCombos(weights, 3)

    for (let [i, row] of weight_combos.entries()) {
      let combo_sum = (row.reduce((a, b) => a + b.weight, 0) * 2)
      row.unshift({ total: combo_sum })
    }
    bars.forEach(bar => {
      if (!bar.fixed) {
        let weight_combos_copy = JSON.parse(JSON.stringify(weight_combos))
        weight_combos_copy.forEach((combo) => {
          combo[0].bar = bar.name
          combo[0].total += bar.weight
          all_combos.push(combo)
        })
      } else {
        let fixed_bar = []
        let fixed_bar_data = {}
        fixed_bar_data = { total: bar.weight, bar: bar.name, fixed: true}
        fixed_bar.push(fixed_bar_data)
        all_combos.push(fixed_bar)
      }
    })

    function comparator(a, b) {
      if (a[0].total < b[0].total) return -1
      if (a[0].total > b[0].total) return 1
      return 0
    }

    all_combos = all_combos.sort(comparator)
  }

  // One function for all radios
  const getRadio = function(radios) {
    for (let radio of radios) {
      if (radio.checked) return radio.value
    }
  }

  // Function that generates the select(s) with the available options. Needs to consider saved combos.
  const renderSelects = function () {
    populateCombosArray()
    let options = []

    for (let select of weight_selects) {

      while (select.options.length) {
        select.remove(0)
      }

      let unit = getRadio(unit_radios),
          bar = getRadio(bar_radios),
          saved_bars = document.querySelectorAll('#saved_combos .weight_combo .bar'),
          saved_weights = document.querySelectorAll('#saved_combos .weight_combo .weight')

      all_combos.forEach(combo => options.push( new Option( ) )) // I guess this can be merged with the next forEach somehow.

      options.forEach((option, i) => {
        let combo = all_combos[i]
        option.dataset.kg = combo[0].total
        option.dataset.lbs = (option.dataset.kg * 2.20462262).toFixed(1)
        option.dataset.bar = combo[0].bar
        option.dataset.id = i 
        //combo.shift() // Why did I remove the ”total object”?
        let recipe = []
        for (let obj of combo) {
          if (obj.weight) {
            recipe.push(obj.weight.toString())
          }
        }
        if (recipe.length > 0) {
          option.dataset.recipe = JSON.stringify(recipe)
          option.text = (option.dataset[unit] + ' ' + unit + ' (' + option.dataset.bar + ' + ' + recipe.join(' + ') + ')').replace(/\./g,',')
        }
        else {
          option.text = (option.dataset[unit] + ' ' + unit + ' (' + option.dataset.bar + ')').replace(/\./g,',')
          option.dataset.fixed = true
        }

        option.disabled = true

        if (option.dataset.bar == bar) {
          option.disabled = false
        }
        else if (bar == 'alla') {
          option.disabled = false
        }

        saved_bars.forEach(saved_bar => {
          if (option.dataset.bar == saved_bar.dataset.bar) {
            option.disabled = true
          }
        })

        saved_weights.forEach(saved_weight => {
          if (recipe.includes(saved_weight.dataset.weight)) {
            option.disabled = true
          }
        })

        select.add(option)
      })

      let enabledCount = 0
      options.forEach(option => {
        if (option.disabled == false) {
          enabledCount += 1
        }
      })

      let preset = new Option ('Välj önskad vikt i ' + unit, 0, true, true)

      if (enabledCount == 0) {
        preset.text = 'Inga hantlar lediga'
        preset.disabled = true
      }

      preset.dataset.id = '-1'
      preset.dataset.kg = '0'
      preset.dataset.lbs = '0'
      preset.dataset.bar = '0'
      preset.dataset.recipe = '["0"]'
      select.add(preset, select[0])
    }
    //changeLabel()
  }

  // Function to generate html for the selected option. Still handles the display of the total, for now.
  const createCombinationHtml = function(input) {

    if (input.dataset.id != -1) {
      var total_lbs = input.dataset.lbs,
          total_kg = input.dataset.kg,
          total_value = document.createTextNode(`Total vikt: ${total_lbs.replace('.',',')} lbs / ${total_kg.replace('.',',')} kg`), // Tried toLocaleString('sv-SE'), but failed.
          set_title = document.createTextNode(`${total_lbs.replace('.',',')} lbs / ${total_kg.replace('.',',')} kg`)
    }

    const combo_wrapper = document.createElement('div'),
          bar_span = document.createElement('span'),
          bar_value = document.createTextNode(input.dataset.bar),
          set_span = document.createElement('span'),
          set_title_wrapper = document.createElement('div')

    while (total_div.firstChild) {
      total_div.firstChild.remove()
    }

    // Add the bar element, unless the first option is chosen
    if (input.dataset.bar != '' && input.dataset.id != -1) {
      combo_wrapper.classList.add('weight_combo','border')
      set_span.classList.add('set-title')
      set_span.appendChild(set_title)
      set_title_wrapper.classList.add('set-title-wrapper')
      set_title_wrapper.appendChild(set_span)
      combo_wrapper.appendChild(set_title_wrapper)
      bar_span.appendChild(bar_value)
      bar_span.classList.add('bar', input.dataset.bar.replace(/\s-.*/,''), input.dataset.bar.replace(/.*\s-\s|\s/g,''))
      bar_span.dataset.bar = input.dataset.bar
      combo_wrapper.appendChild(bar_span)
    }

    // Show the weights, if there is any
    if (input.dataset.recipe && input.dataset.id != -1) {

      document.querySelector('.input_wrapper h3').style.display = 'block'

      for (let weight of JSON.parse(input.dataset.recipe)) {
        const separator_span = document.createElement('span'),
              separator_value = document.createTextNode(' + '),
              weight_span = document.createElement('span'),
              weight_value = document.createTextNode(weight)
        
        separator_span.appendChild(separator_value)
        separator_span.classList.add('separator')
        combo_wrapper.appendChild(separator_span)
        weight_span.appendChild(weight_value)
        weight_span.classList.add('weight')
        weight_span.dataset.weight = weight
        combo_wrapper.appendChild(weight_span)
      }
    }

    // If selected option has a weight, show the total
    if (!isNaN(parseFloat(total_kg)) ) {
      total_div.appendChild(total_value)
    }

    return combo_wrapper
  }

  // Re-renders selects when unit is changed
  for (let radio of all_radios) {
    radio.addEventListener('change', function() {
      renderSelects()
      changeLabel()
    })
  }

  // Keep the unit label correct in the custom input
  const changeLabel = function() {
    let unit = getRadio(unit_radios)
    unit_label.innerText = unit
  }

  // Listener that fetches and shows combination when select is changed.
  the_select.addEventListener('change', function(evt) {
    let id = evt.currentTarget.options.selectedIndex,
        option = evt.currentTarget.options[id]

    findClosest(null)

    if (id == 0) {
      save_button.disabled = true
    }
    else {
      recipe_div.innerHTML = createCombinationHtml(option).outerHTML
      save_button.disabled = false  
    }
  })

  // Function for custom input.
  const findClosest = function(target) {

    if (target) {
      let key = 0,
          valid_options = [],
          counts = [],
          converted = 0,
          unit = getRadio(unit_radios)
      
      // Makes sure only valid options are used
      for (const option of the_select.options) { 
        if (option.disabled == false) {
          valid_options.push(option)
          counts.push(parseFloat(option.dataset[unit]))
        }
      }
      
      counts[0] = -100 // Replace the first string with a value that will not be matched.

      let closest = counts.reduce(function(prev, curr) {
        return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev) // Bug: If input is 10000000000000000 (16 zeros) or bigger, wrong results are returned. Workaround in place in input handler.
      })

      if (unit == 'lbs') {
        converted = (target * 0.45359237).toFixed(2).replace('.',',') + ' kg'
      }
      else if (unit == 'kg') {
        converted = (target * 2.20462262).toFixed(2).replace('.',',') + ' lbs'
      }

      input_div.innerText = target.toString().replace('.',',') + ' ' + unit + ' ≈ ' + converted
      closest_div.innerText = 'Närmaste hantelvikt är: ' + closest.toString().replace('.',',') + ' ' + unit  

      for (let option of valid_options) {
        if ( option.dataset[unit] == closest ) {
          key = parseInt(option.dataset.id) + 1
        }
      }

      const option = the_select.options[key]

      recipe_div.innerHTML = createCombinationHtml(option).outerHTML
      save_button.disabled = false
    }

    else {
      // Clear all previous results if input is invalid
      input_div.innerHTML = '&nbsp;'
      closest_div.innerHTML = '&nbsp;'
      document.querySelector('#weight_combo_all').innerHTML = '&nbsp;'
      document.querySelector('#total').innerHTML = '&nbsp;'
      save_button.disabled = true
    }
  }

  // Trigger for custom input
  custom_input.oninput = handleInput
  function handleInput(evt) {
    if (!isNaN(parseFloat(evt.currentTarget.value))) {
      let target = evt.currentTarget.value
      
      // Workaround for bug in findClosest.
      if (target > 100) {
        target = 100
      }

      findClosest(target)
      the_select.value = '0'
    }
    else {
      findClosest(null)
    }
  }

  // Handle clicks in reference chart
  const references = document.querySelectorAll('.reference')
  for (let reference of references) {
    reference.addEventListener('click', function(evt) {
      let reference_weight = parseFloat(evt.currentTarget.dataset.lbs),
          input_event = new Event('input')

      unit_radio_lbs.checked = true
      changeLabel()
      custom_input.value = reference_weight
      custom_input.dispatchEvent(input_event)
    })
  }

  // Save current combo and disable conflictiong options. 
  document.querySelector('#save_combo').addEventListener('click', function(evt) {

    let current_combo = document.querySelector('#weight_combo_all .weight_combo.border')

    if (current_combo) {
      reset_button.style.display = 'block'
      document.querySelector('#saved_combos').appendChild(current_combo)
      custom_input.value = ''
      handleInput(evt)
      document.querySelector('.input_wrapper h3').style.display = 'none'
      save_button.disabled = true
      renderSelects()
    }
  })

  // Remove saved combos, hide button, re-render select
  reset_button.addEventListener('click', function() {
    let saved_combos = document.querySelectorAll('#saved_combos .weight_combo')

    saved_combos.forEach((saved_combo, i) => {
      saved_combo.remove()
    })

    reset_button.style.display = 'none'
    renderSelects()
  })

  renderSelects()
  changeLabel()
}())