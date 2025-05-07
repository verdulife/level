<script lang="ts">
	import type { PageProps } from './$types';
	import type { ChatMessageV2, ChatResponse, ResponseFormatV2 } from 'cohere-ai/api';
	import { CohereClientV2 } from 'cohere-ai';

	let { data }: PageProps = $props();
	const cohere = new CohereClientV2({ token: data.token });

	let quest = $state({ title: '', description: '' });
	let messages: ChatMessageV2[] = [
		{
			role: 'system',
			content:
				'Eres una IA entrenada para generar quests para una app que simula el juego de RPG pero en la vida real. Tu mision es generar misiones diarias para mejorar estadisticas como fuerza, salud, inteligencia, etc. Las quests tienen que poder realizarse por cualquier tipo de persona. Generas respuestas de un par de lineas, aproximadamente 100 caracteres.'
		},
		{
			role: 'user',
			content:
				'Hola, quiero que me crees una quest diaria aleatoria para mejorar mis estadisticas personales.'
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
	<p class="w-full text-xl font-bold">{quest.title}</p>
	<p class="w-full">{quest.description}</p>
</section>
