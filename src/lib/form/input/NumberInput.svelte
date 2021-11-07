<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Input from '$lib/form/input/Input.svelte';

  export let id = 'number-input';
  export let label: string;
  export let name: string;
  export let placeholder: string;
  export let step: number = 10;
  export let value = '';

  const dispatch = createEventDispatcher();

  const handleStep = (e: MouseEvent, value: number): void => {
    e.preventDefault();
  }
</script>

<div>
  <button aria-label={`Subtract ${step} from ${value}`} type="button" on:click={(e: MouseEvent): void => handleStep(e, -1)}>-</button>
  <Input on:change={(val: string) => dispatchEvent('change', val)} id={id} label={label} name={name} placeholder={placeholder} type="number" value={value} />
  <button aria-label={`Add ${step} to ${value}`} type="button" on:click={(e: MouseEvent): void => handleStep(e, 1)}>+</button>
</div>