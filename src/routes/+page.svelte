<script lang="ts">
	import type {
		InitProgressCallback,
		ResponseFormat,
		ChatCompletionRequest
	} from '@mlc-ai/web-llm';
	import { CreateMLCEngine } from '@mlc-ai/web-llm';
	import { onMount } from 'svelte';
	const AI_MODEL = 'Llama-3.2-1B-Instruct-q4f32_1-MLC';

	let loading = '';
	let message = '';
	let engine: any;

	async function generate() {
		message = '';

		const request: ChatCompletionRequest = {
			stream: true,
			stream_options: { include_usage: true },
			messages: [
				{
					role: 'system',
					content:
						'Eres una IA entrenada para generar quests de RPG para una app que gamifica la vida del usuario.'
				},
				{
					role: 'user',
					content:
						'Crea una quest en un par de lineas, maximo 160 caracteres, para un usuario que necesita mejorar su estadistica de constancia'
				}
			] /* ,
			n: 2,
			response_format: { type: 'json_object' } as ResponseFormat */
		};

		const chunks = await engine.chat.completions.create(request);

		for await (const chunk of chunks) {
			const piece = chunk.choices[0]?.delta?.content || '';
			message += piece;
		}
	}

	onMount(async () => {
		const initProgressCallback: InitProgressCallback = (initProgress) => {
			loading = initProgress.text;
		};

		engine = await CreateMLCEngine(AI_MODEL, { initProgressCallback });
	});
</script>

<section class="relative flex w-full max-w-6xl flex-1 flex-col items-center p-6">
	<p class="w-full">{message}</p>

	{#if engine}
		<button
			class="absolute right-6 bottom-6 left-6 rounded-md bg-blue-500 p-2 text-center text-neutral-100"
			on:click={generate}
		>
			Generar
		</button>
	{:else}
		<p class="absolute right-6 bottom-6 left-6 text-xs text-neutral-500">{loading}</p>
	{/if}
</section>
