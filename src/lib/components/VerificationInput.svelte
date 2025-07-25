<script>
  // Prop to receive the function to execute when all inputs are filled
  export let onComplete = () => {};

  // Array to store the values of each input
  let values = Array(6).fill('');
  // Array to store references to input elements for focusing
  let inputs = [];

  // Handle input change for each input
  function handleInput(event, index) {
    const value = event.target.value;

    // Allow only one character (ignore additional input)
    if (value.length > 1) {
      event.target.value = value[0];
      values[index] = value[0];
    } else {
      values[index] = value;
    }

    // Move focus to next input if a character is entered and not the last input
    if (value && index < 5) {
      inputs[index + 1].focus();
    }

    // Check if all inputs are filled and call onComplete
    if (values.every(val => val.length === 1)) {
      onComplete(values.join('')); // Pass the concatenated code to the function
    }
  }

  // Handle keydown for backspace to move to previous input
  function handleKeydown(event, index) {
    if (event.key === 'Backspace' && !values[index] && index > 0) {
      inputs[index - 1].focus();
    }
  }

  // Handle paste to distribute characters across inputs
  function handlePaste(event, index) {
    event.preventDefault();
    const paste = event.clipboardData.getData('text').slice(0, 6); // Limit to 6 characters
    values = paste.padEnd(6, '').split('').slice(0, 6); // Distribute characters
    inputs[Math.min(paste.length, 5)].focus(); // Focus the last filled input or the last one
    if (values.every(val => val.length === 1)) {
      onComplete(values.join('')); // Call onComplete if all filled
    }
  }
</script>

<div class="flex items-center justify-center gap-3">
  {#each Array(6) as _, index}
    <input
      type="text"
      maxlength="1"
      class="w-18 h-18 p-2 border border-light-gray rounded shadow-xl text-center"
      bind:value={values[index]}
      bind:this={inputs[index]}
      on:input={(e) => handleInput(e, index)}
      on:keydown={(e) => handleKeydown(e, index)}
      on:paste={(e) => handlePaste(e, index)}
      name={`code-${index + 1}`}
      aria-label={`Verification code input ${index + 1}`}
    />
  {/each}
</div>

<style>
  input:focus {
    outline: none;
    border: 2px solid var(--primary-color);
  }
</style>