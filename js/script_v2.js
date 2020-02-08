(function () {
  'use strict'

  // Look at all the data!
  const all_bars_data = [
    { 'kg': 'Välj önskad vikt i', 'lbs': 'Välj önskad vikt i', 'bar': '', 'recipe': [ 'Välj önskad vikt' ] },
    { 'kg': 1.6, 'lbs': 3.5, 'bar': 'svart', 'recipe': [ '' ] },
    { 'kg': 1.8, 'lbs': 4, 'bar': 'silver', 'recipe': [ '' ] },
    { 'kg': 2, 'lbs': 4.4, 'bar': 'fast - 2 kg', 'recipe': [ '' ] },
    { 'kg': 2.6, 'lbs': 5.7, 'bar': 'svart', 'recipe': [ '0,5' ] },
    { 'kg': 2.8, 'lbs': 6.2, 'bar': 'silver', 'recipe': [ '0,5' ] },
    { 'kg': 3, 'lbs': 6.6, 'bar': 'fast - 3 kg', 'recipe': [ '' ] },
    { 'kg': 3.6, 'lbs': 7.9, 'bar': 'svart', 'recipe': [ '1,0' ] },
    { 'kg': 3.8, 'lbs': 8.4, 'bar': 'silver', 'recipe': [ '1,0' ] },
    { 'kg': 4.1, 'lbs': 9.0, 'bar': 'svart', 'recipe': [ '1,25' ] },
    { 'kg': 4.3, 'lbs': 9.5, 'bar': 'silver', 'recipe': [ '1,25' ] },
    { 'kg': 4.6, 'lbs': 10.1, 'bar': 'svart', 'recipe': [ '1,5' ] },
    { 'kg': 4.8, 'lbs': 10.6, 'bar': 'silver', 'recipe': [ '1,5' ] },
    { 'kg': 5.1, 'lbs': 11.2, 'bar': 'svart', 'recipe': [ '1,25', '0,5' ] },
    { 'kg': 5.3, 'lbs': 11.7, 'bar': 'silver', 'recipe': [ '1,25', '0,5' ] },
    { 'kg': 5.6, 'lbs': 12.3, 'bar': 'svart', 'recipe': [ '1,5', '0,5' ] },
    { 'kg': 5.8, 'lbs': 12.8, 'bar': 'silver', 'recipe': [ '1,5', '0,5' ] },
    { 'kg': 6, 'lbs': 13.2, 'bar': 'fast - 6 kg', 'recipe': [ '' ] },
    { 'kg': 6.1, 'lbs': 13.4, 'bar': 'svart', 'recipe': [ '1,25', '1' ] },
    { 'kg': 6.3, 'lbs': 13.9, 'bar': 'silver', 'recipe': [ '1,25', '1' ] },
    { 'kg': 6.6, 'lbs': 14.6, 'bar': 'svart', 'recipe': [ '2,5' ] },
    { 'kg': 6.8, 'lbs': 15.0, 'bar': 'silver', 'recipe': [ '2,5' ] },
    { 'kg': 7.1, 'lbs': 15.7, 'bar': 'svart', 'recipe': [ '1,5', '1,25' ] },
    { 'kg': 7.3, 'lbs': 16.1, 'bar': 'silver', 'recipe': [ '1,5', '1,25' ] },
    { 'kg': 7.6, 'lbs': 16.8, 'bar': 'svart', 'recipe': [ '2,5', '0,5' ] },
    { 'kg': 7.8, 'lbs': 17.2, 'bar': 'silver', 'recipe': [ '2,5', '0,5' ] },
    { 'kg': 8.1, 'lbs': 17.9, 'bar': 'svart', 'recipe': [ '1,5', '1,25', '0,5' ] },
    { 'kg': 8.3, 'lbs': 18.3, 'bar': 'silver', 'recipe': [ '1,5', '1,25', '0,5' ] },
    { 'kg': 8.6, 'lbs': 19.0, 'bar': 'svart', 'recipe': [ '2,5', '1' ] },
    { 'kg': 8.8, 'lbs': 19.4, 'bar': 'silver', 'recipe': [ '2,5', '1' ] },
    { 'kg': 9.1, 'lbs': 20.1, 'bar': 'svart', 'recipe': [ '2,5', '1,25' ] },
    { 'kg': 9.3, 'lbs': 20.5, 'bar': 'silver', 'recipe': [ '2,5', '1,25' ] },
    { 'kg': 9.6, 'lbs': 21.2, 'bar': 'svart', 'recipe': [ '2,5', '1,5' ] },
    { 'kg': 9.8, 'lbs': 21.6, 'bar': 'silver', 'recipe': [ '2,5', '1,5' ] },
    { 'kg': 10.1, 'lbs': 22.3, 'bar': 'svart', 'recipe': [ '2,5', '1,25', '0,5' ] },
    { 'kg': 10.3, 'lbs': 22.7, 'bar': 'silver', 'recipe': [ '2,5', '1,25', '0,5' ] },
    { 'kg': 10.6, 'lbs': 23.4, 'bar': 'svart', 'recipe': [ '2,5', '1,5', '0,5' ] },
    { 'kg': 10.8, 'lbs': 23.8, 'bar': 'silver', 'recipe': [ '2,5', '1,5', '0,5' ] },
    { 'kg': 11.1, 'lbs': 24.5, 'bar': 'svart', 'recipe': [ '2,5', '1,25', '1' ] },
    { 'kg': 11.3, 'lbs': 24.9, 'bar': 'silver', 'recipe': [ '2,5', '1,25', '1' ] },
    { 'kg': 11.6, 'lbs': 25.6, 'bar': 'svart', 'recipe': [ '2,5', '1,5', '1' ] },
    { 'kg': 11.8, 'lbs': 26.0, 'bar': 'silver', 'recipe': [ '2,5', '1,5', '1' ] }
  ]

  // Some useful elements
  const closest_div = document.querySelector('#closest'),
        input_div = document.querySelector('#input_feedback'),
        custom_input = document.querySelector('#custom_input'),
        unit_radio_lbs = document.querySelector('#unit-radio-one'),
        unit_radio_kg = document.querySelector('#unit-radio-two'),
        bar_radio_both = document.querySelector('#bar-radio-one'),
        bar_radio_black = document.querySelector('#bar-radio-two'),
        bar_radio_silver = document.querySelector('#bar-radio-three'),
        bar_radios = document.querySelectorAll('.bar_switch'),
        unit_radios = document.querySelectorAll('.unit_switch')

  // One function for all radios
  const getRadio = function(radios) {
    for (let radio of radios) {
      if (radio.checked) return radio.value
    }
  }

  // Function to render selects using data source
  const renderSelects = function () {
    const selects = document.querySelectorAll('.weight_select'), 
          options = []
    
    for (let select of selects) {
      let data = eval(select.getAttribute('data-data'))

      while (select.options.length) {
        select.remove(0)
      }

      let unit = getRadio(unit_radios)
      let bar = getRadio(bar_radios)

      data.forEach(weight => options.push( new Option( weight[unit].toString().replace('.',',') + ' ' + unit, weight[unit] ) ))
      
      options.forEach((option, i) => {
        option.dataset.kg = data[i].kg
        option.dataset.lbs = data[i].lbs
        option.dataset.bar = data[i].bar
        option.dataset.recipe = JSON.stringify(data[i].recipe)
        option.dataset.id = i 

        if (i != 0) {
          option.disabled = true
        }
        if (option.dataset.bar == bar) {
          option.disabled = false
        }
        else if (bar == 'alla') {
          option.disabled = false
        }
        select.add(option)
      })
    }
    changeLabel()
  }

  // Function to show the values for the selected option 
  const showCombination = function(input, bar, recipe, key) {
    const recipe_div = document.querySelector('#weight_combo_all'),
          total_div = document.querySelector('#total'),
          total_lbs = all_bars_data[key].lbs.toString(),
          total_kg = input.dataset.kg,
          //total_value = document.createTextNode('Total vikt: ' + total_kg.replace('.',',') + ' kg / ' + total_lbs.replace('.',',') + ' lbs'), // Tried toLocaleString('sv-SE'), but failed.
          total_value = document.createTextNode(`Total vikt: ${total_lbs.replace('.',',')} lbs / ${total_kg.replace('.',',')} kg`), // Tried toLocaleString('sv-SE'), but failed.
          bar_span = document.createElement('span'),
          bar_value = document.createTextNode(bar)

    while (recipe_div.firstChild) {
      recipe_div.firstChild.remove()
    }

    while (total_div.firstChild) {
      total_div.firstChild.remove()
    }

    // Add the bar element, unless the first option is chosen
    if (bar != "" && key != 0) {
      bar_span.appendChild(bar_value)
      bar_span.classList.add('bar', bar.replace(/\s-.*/,''), bar.replace(/.*\s-\s|\s/g,''))
      recipe_div.append(bar_span)
    }

    // Show recipe for chosen weight, if there is one
    if (recipe != "" && key != 0) {

      for (let weight of recipe) {
        const separator_span = document.createElement('span'),
              separator_value = document.createTextNode(' + '),
              weight_span = document.createElement('span'),
              weight_value = document.createTextNode(weight)
        
        separator_span.appendChild(separator_value)
        separator_span.classList.add('separator')
        recipe_div.append(separator_span)
        weight_span.appendChild(weight_value)
        weight_span.classList.add('weight')
        recipe_div.append(weight_span)
      }
    }

    // If selected option has a weight, show the total
    if (!isNaN(parseFloat(total_kg)) ) {
      total_div.appendChild(total_value)          
      //recipe_div.closest('div').after(total_div) - Why did I do this?
    }
      
  }

  // Re-renders selects when unit is changed
  const radios = document.querySelectorAll('.switch input[type="radio"]')
  for (let radio of radios) {
    radio.addEventListener('change', function() {
      renderSelects()
    })
  }

  const the_label = document.querySelector('#unit_label')
  const changeLabel = function() {
    let unit = getRadio(unit_radios)
    the_label.innerText = unit
  }

  // Listener that triggers showCombination when select is changed.
  const the_select = document.querySelector('#all_bars')

  the_select.addEventListener('change', function(evt) {
    let id = evt.currentTarget.options.selectedIndex,
        bar = evt.currentTarget.options[id].getAttribute('data-bar'),
        recipe = JSON.parse(evt.currentTarget.options[id].getAttribute('data-recipe')),
        key = evt.currentTarget.options[id].getAttribute('data-id'),
        option = evt.currentTarget.options[id]

    showCombination(option, bar, recipe, key)
  })

  // Function for custom input
  const findClosest = function(target) {

    if (target) {
      let key = 0,
          counts = [], // First version that uses all values from all_bars_data. Not used for now.
          counts2 = [], // Second version that uses non-disabled options data
          converted = 0

      let unit = getRadio(unit_radios)
      
      for (const obj of all_bars_data) {
        counts.push(obj[unit])
      }
      
      for (const option of the_select.options) {
        if (option.disabled == false) {
          counts2.push(parseFloat(option.dataset[unit]))
        }
      }
      
      counts[0] = -100 // Replace the first string with a value that will not be matched.
      counts2[0] = -100 // Replace the first string with a value that will not be matched.

      let closest = counts2.reduce(function(prev, curr) {
        return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev)
      })

      if (unit == 'lbs') {
        converted = (target * 0.45359237).toFixed(2).replace('.',',') + ' kg'
      }
      else if (unit == 'kg') {
        converted = (target * 2.20462262).toFixed(2).replace('.',',') + ' lbs'
      }

      input_div.innerText = target.toString().replace('.',',') + ' ' + unit + ' ≈ ' + converted
      closest_div.innerText = 'Närmaste hantelvikt är: ' + closest.toString().replace('.',',') + ' ' + unit  

      for (const [index, value] of counts.entries()) {
        if ( value == closest ) {
          key = index
        }
      }
      const option = the_select.options[key]

      for (const obj of all_bars_data) {
        if (obj[unit] == closest) {
          let bar = obj.bar,
              recipe = obj.recipe
              showCombination(option, bar, recipe, key)
        }
      }
    }

    else {
      // Clear all previous results if input is invalid
      input_div.innerHTML = '&nbsp;'
      closest_div.innerHTML = '&nbsp;'
      document.querySelector('#weight_combo_all').innerHTML = '&nbsp;'
      document.querySelector('#total').innerHTML = '&nbsp;'
    }
  }

  custom_input.oninput = handleInput
  function handleInput(evt) {
    if (!isNaN(parseFloat(evt.currentTarget.value))) {
      let target = evt.currentTarget.value
      findClosest(target)
    }
    else {
      findClosest(null)
    }
  }
  
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

  renderSelects()

}())