        <div class="container php hidden">
            <div class="input_wrapper">
                <label for="php_bar1">Silver (1,8 kg)</label>
                <select id="input1" name="php_bar1">
                    <option value="">Välj önskad vikt</option>
                    <?php foreach($bar1_weights as $key=>$weight){ 
                    echo "<option data-id='".$key."' value='".$weight."'>$weight</option>";
                }?>
                </select>
                <span class="weight_combo"></span>
            </div>
            <div class="input_wrapper">
                <label for="bar2">Svart (1,6 kg)</label>
                <select id="input2" name="bar2">
                    <option value="">Välj önskad vikt</option>
                    <?php foreach($bar2_weights as $key=>$weight){ 
                    echo "<option data-id='".$key."' value='".$weight."'>$weight</option>";
                }?>
                </select>
                <span class="weight_combo"></span>
            </div>
        </div>
