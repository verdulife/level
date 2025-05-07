<script lang="ts">
	import { CohereClientV2 } from 'cohere-ai';
	import type { ChatMessageV2, ChatResponse, ResponseFormatV2 } from 'cohere-ai/api';

	const COHERE_TOKEN = 'zkXusf2XxAI8K9SZpbUo1TKu8OrQI25UiKKg7Vkp';
	const cohere = new CohereClientV2({ token: COHERE_TOKEN });

	let quest = { title: '', description: '' };
	let messages: ChatMessageV2[] = [
		{
			role: 'system',
			content:
				'Eres una IA entrenada para generar quests para una app que simula el juego de RPG pero en la vida real. Tu mision es generar misiones diarias para mejorar estadisticas como fuerza, salud, inteligencia, etc. Las quests tienen que poder realizarse por cualquier tipo de persona. Generas respuestas de un par de lineas, aproximadamente 100 caracteres.'
		},
		{
			role: 'user',
			content:
				'Hola, quiero que me crees una mision diaria para mejorar mis estadisticas de igiene personal.'
		}
	];

	const responseFormat: ResponseFormatV2 = {
		type: 'json_object',
		jsonSchema: {
			type: 'object',
			properties: {
				title: { type: 'string', description: 'El titulo de la quest' },
				description: { type: 'string', description: 'Descripcion de la quest' }
			},
			required: ['title', 'description']
		}
	};

	(async () => {
		const response: ChatResponse = await cohere.chat({
			model: 'command-r7b-12-2024',
			messages,
			responseFormat
		});

		const raw = response.message.content?.[0].text!;
		quest = JSON.parse(raw);
	})();
</script>

<section class="relative flex w-full max-w-6xl flex-1 flex-col items-center p-6">
	{#if quest}
		<p class="w-full text-xl font-bold">{quest.title}</p>
		<p class="w-full">{quest.description}</p>
	{/if}
</section>
