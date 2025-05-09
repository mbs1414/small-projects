<script setup lang="ts">
const text = ref<string>("");
const amount = ref<number | null>(null);
const income = ref<number>(0);
const expense = ref<number>(0);
const disableBtn = ref<boolean>(true);
const histoyyModal = ref<boolean>(false);
const pagination = ref<number>(1);
interface History {
  text: string;
  amount: number;
}
const history = ref<History[]>([
  { text: "fruits", amount: 1000 },
  { text: "vegetables", amount: 1200 },
  { text: "meat", amount: 2500 },
  { text: "dairy", amount: 1500 },
  { text: "bakery", amount: 800 },
  { text: "snacks", amount: 500 },
  { text: "beverages", amount: 700 },
  { text: "cleaning supplies", amount: 1100 },
  { text: "beauty products", amount: 1300 },
  { text: "clothing", amount: 2000 },
  { text: "electronics", amount: 4500 },
  { text: "books", amount: 600 },
  { text: "fitness", amount: 1800 },
  { text: "sports equipment", amount: 2500 },
  { text: "auto maintenance", amount: 3000 },
  { text: "furniture", amount: 5000 },
  { text: "home decor", amount: 2200 },
  { text: "pet supplies", amount: 900 },
  { text: "entertainment", amount: 1500 },
  { text: "subscriptions", amount: 800 },
  { text: "software", amount: 1200 },
  { text: "baby products", amount: 950 },
  { text: "education", amount: 4000 },
  { text: "healthcare", amount: 3200 },
  { text: "insurance", amount: 2700 },
  { text: "travel", amount: 6500 },
  { text: "dining out", amount: 1900 },
  { text: "investments", amount: 7000 },
  { text: "taxes", amount: 6000 },
  { text: "utilities", amount: 2500 },
  { text: "charity", amount: 600 },
  { text: "legal services", amount: 3500 },
  { text: "consulting", amount: 2800 },
  { text: "advertising", amount: 1700 },
  { text: "marketing", amount: 2300 },
  { text: "hobbies", amount: 1300 },
  { text: "crafting", amount: 900 },
  { text: "security", amount: 1400 },
  { text: "web hosting", amount: 1600 },
  { text: "cloud storage", amount: 1200 },
  { text: "gardening", amount: 800 },
  { text: "tools", amount: 1100 },
  { text: "party supplies", amount: 700 },
  { text: "repair services", amount: 2900 },
  { text: "gaming", amount: 1800 },
  { text: "photography", amount: 1400 },
  { text: "music", amount: 1200 },
  { text: "decor", amount: 1000 },
  { text: "school supplies", amount: 600 },
]);

const paginatedHistory = computed(() => {
  return history.value.slice((pagination.value - 1) * 5, pagination.value * 5);
});

function submit() {
  if (text.value !== "" && amount.value !== null) {
    history.value.push({ text: text.value.trimStart(), amount: amount.value });
    income.value = history.value
      .filter((item: History) => item.amount >= 0)
      .reduce((sum: number, item: History) => sum + item.amount, 0);

    expense.value = history.value
      .filter((item: History) => item.amount < 0)
      .reduce((sum: number, item: History) => sum + item.amount, 0);
  }
  text.value = "";
  amount.value = null;
}
watch([text, amount], ([newText, newAmount]: [string, number | null]) => {
  console.log(newAmount);

  let point = 0;
  if (newText !== "") {
    point++;
  }
  if (newAmount !== null) {
    point++;
  }
  if (point === 2) {
    disableBtn.value = false;
  } else {
    disableBtn.value = true;
  }
});
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <section
      class="bg-indigo-900 w-72 rounded-2xl font-mono text-cyan-100 py-2"
    >
      <div class="text-center">
        <div class="capitalize font-extrabold text-xl">expense tracker</div>
        <div class="flex flex-col">
          <span class="uppercase">your balance</span>
          <span class="text-3xl leading-5">${{ income + expense }}</span>
        </div>
        <div
          class="flex justify-center shadow-2xl bg-indigo-700 h-12 w-3/4 rounded-lg mx-auto my-2 uppercase"
        >
          <div class="flex flex-col justify-center w-[45%] h-full">
            <span>income</span
            ><span class="font-bold leading-3 text-green-500">
              ${{ income }}</span
            >
          </div>
          <q-separator vertical inset color="white" />
          <div class="flex flex-col justify-center w-[45%] h-full">
            <span>expense</span
            ><span class="font-bold leading-3 text-red-400"
              >${{ expense }}</span
            >
          </div>
        </div>
        <div
          class="w-3/4 mx-auto text-left overflow-hidden"
          style="height: 132px"
        >
          <div
            class="capitalize text-base font-bold cursor-pointer"
            @click="histoyyModal = true"
          >
            history
          </div>
          <q-separator color="white" />
          <div
            class="font-serif flex justify-between items-center capitalize bg-slate-600 p-0.5 my-2 border-r-4 shadow-2xl"
            :class="item.amount >= 0 ? 'border-green-500' : 'border-red-400'"
            v-for="(item, index) in history.slice(-3)"
            :key="index"
          >
            <span class="w-1/2 truncate">{{ item.text }}</span>
            <span>${{ item.amount }}</span>
          </div>
        </div>
      </div>
      <div class="w-3/4 mx-auto text-left">
        <div class="capitalize text-base font-bold">add new transaction</div>
        <q-separator color="white" />
        <div>
          <span class="capitalize">text</span>
          <q-input
            v-model="text"
            label-color="white"
            type="text"
            outlined
            dense
            label="Enter text..."
            color="white"
            input-class="text-white"
          />
        </div>
        <div>
          <div class="flex flex-col">
            <span class="capitalize">amount</span>
            <span class="text-xs">(negative - expense, positive - income)</span>
          </div>
          <q-input
            v-model="amount"
            type="number"
            label-color="white"
            outlined
            dense
            label="Enter amount..."
            color="white"
            input-class="text-white"
            @update:model-value="
              amount = $event ? parseFloat($event) || null : null
            "
            @change="submit"
          />
        </div>
      </div>
      <div class="grid mx-auto w-3/4 my-2">
        <q-btn
          label="Add Transaction"
          color="primary"
          @click="submit"
          :disable="disableBtn"
        />
      </div>
    </section>

    <q-dialog v-model="histoyyModal">
      <q-card>
        <q-card-section>
          <div>
            <div class="q-pa-md">
              <q-markup-table dark class="bg-indigo-8">
                <thead>
                  <tr>
                    <th>row</th>
                    <th>name</th>
                    <th>Dollar</th>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in paginatedHistory" :key="index">
                  <tr>
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-center">{{ item.text }}</td>
                    <td class="text-center">{{ item.amount }}$</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
            <div class="q-pa-lg flex flex-center">
              <q-pagination
                v-model="pagination"
                :max="Math.ceil(history.length / 10)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.q-field--outlined .q-field__control::before {
  border: 1px solid white;
}
</style>
