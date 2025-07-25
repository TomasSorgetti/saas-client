<script>
    export let type = 'submit';
    export let onClick = () => {};
    export let primary = false;
    export let secondary = false;
    export let disabled = false;
</script>

<button 
    type={type} 
    on:click={onClick} 
    disabled={disabled}
    class="cursor-pointer transition-all duration-300 hover:shadow-3xl font-bold py-2 px-4 rounded-md h-[48px]
           {primary ? 'bg-[linear-gradient(90deg,_var(--primary-color),_var(--secondary-color))] text-white' : ''}
           {secondary ? 'bg-gray-300 text-black' : ''}
           {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
>
    <slot></slot>
</button>