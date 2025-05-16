<template>
  <div class="flex justify-center items-center w-full">
    <section
      class="flex flex-col justify-center bg-gray-900 rounded-md font-sans text-cyan-100 pt-2 capitalize"
    >
      <div class="text-center px-10">
        <div><b>corp</b><span>comment</span></div>
        <div class="font-bold text-3xl">
          <span>give feedback.</span>
          <i> publicly.</i>
        </div>
      </div>
      <div class="grid mx-3 mt-3">
        <textarea
          v-model="text"
          class="resize-none h-20 p-1 bg-gray-800 rounded-md focus:outline-none"
          placeholder="Enter your feedback here, remember to #hashtag the company"
          @keydown="
            text.length > 150 &&
              ![
                'Backspace',
                'Delete',
                'ArrowLeft',
                'ArrowRight',
                'ArrowUp',
                'ArrowDown',
              ].includes($event.key) &&
              $event.preventDefault()
          "
        />
      </div>
      <div class="flex justify-between mx-3">
        <div class="text-gray-400 font-serif">{{ 150 - text.length }}</div>
        <div class="my-3">
          <q-btn
            color="accent"
            label="SUBMIT"
            rounded
            @click="submit"
            :disable="!(/^.*#.{3,}$/.test(text) && text.length >= 5)"
          />
        </div>
      </div>
      <div class="bg-gray-700 h-60 rounded-b-md">
        <div
          class="flex flex-row w-full my-2"
          v-for="(item, index) in commentList"
          :key="index"
        >
          <div
            class="w-[10%] flex flex-col justify-center items-center text-indigo-300"
          >
            <font-awesome
              icon="sort-up"
              class="text-lg hover:text-indigo-500 cursor-pointer transition-transform hover:-translate-y-1"
              @click="
                hasVoted
                  ? (item.vote--, (hasVoted = false))
                  : (item.vote++, (hasVoted = true))
              "
            />
            <div class="leading-1">{{ item.vote }}</div>
          </div>
          <div
            class="flex justify-center items-center text-2xl h-12 w-12 bg-amber-700 rounded-md font-bold"
          >
            {{ item.label.match(/#(\w+)/)?.[1].split("")[0].toUpperCase() }}
          </div>
          <div class="flex items-start flex-col w-[70%] px-1">
            <div
              class="font-serif font-bold tracking-wider text-indigo-300 text-xs"
            >
              {{ item.label.match(/#(\w+)/)?.[1] }}
            </div>
            <div class="tracking-wider -mt-1 w-72 line-clamp-2 text-xs">
              {{ item.label }}
            </div>
          </div>
          <div class="w[10%] flex items-center text-indigo-300">5d</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
const text = ref<string>("");
const commentList = ref<{ label: string; vote : number }[]>([]);
const hasVoted = ref(false);
function submit() {

  if (text.value !== "") {
    commentList.value.push({ label: text.value, vote:0 });
    text.value = "";
  }
}
onMounted(() => {
  commentList.value.push({ label: "sice everyday #netflix", vote: 10 });
});
</script>
