<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col items-center sm:flex-row gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <FontAwesomeIcon :icon="faSun" class="text-xl" />
          <h1 class="text-2xl">Vue Weather App</h1>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <FontAwesomeIcon
          :icon="faCircleInfo"
          @click="toggleInfoModal"
          class="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        />
        <FontAwesomeIcon
          :icon="faPlus"
          @click="addCity"
          v-if="Object.keys(route.query).length > 0"
          class="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        />
      </div>

      <!-- Info Modal -->
      <BaseModal :modalActive="infoModalActive" @close-modal="toggleInfoModal">
        <h2 class="text-2xl mb-1">앱 사용 방법</h2>
        <p class="mb-4">
          이 앱에서는 원하는 장소의 날씨를 검색할 수 있습니다. 검색창에
          국가명이나 도시를 입력하세요.
        </p>
        <h2 class="text-xl">사용 순서</h2>
        <ol class="list-decimal list-inside mb-4">
          <li>
            날씨 정보를 알고 싶은 장소를 검색 표시줄에 입력하여 검색합니다.
          </li>
          <li>
            결과 리스트에서 원하는 곳을 선택하면 해당 위치의 현재 날씨를 알 수
            있는 상세 페이지로 이동랍니다.
          </li>
          <li>
            오른쪽 위에 있는 "+" 아이콘을 클릭하여 원하는 지역을 저장할 수
            있습니다. 나중에 메인에서 해당 지역의 날씨 정보를 한눈에 볼 수
            있습니다.
          </li>
        </ol>

        <h2 class="text-xl">저장된 장소 삭제하기</h2>
        <p>
          저장된 장소를 더 이상 저장하고 싶지 않다면 홈페이지 내에서 저장된
          지역의 상세 페이지로 이동하세요. 상세 페이지 하단에 해당 지역을 삭제할
          수 있는 버튼이 있습니다.
        </p>
      </BaseModal>

      <!-- Add Modal -->
      <BaseModal :modalActive="addModalActive" @close-modal="toggleAddModal">
        <h2 v-html="addModalMessage"></h2>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSun, faCircleInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { ref } from "vue";
import { uid } from "uid";

const route = useRoute();
const router = useRouter();
const infoModalActive = ref(false);
const addModalActive = ref(false);
const savedCities = ref([]);
const addModalMessage = ref("");

const toggleInfoModal = () => {
  infoModalActive.value = !infoModalActive.value;
};

const toggleAddModal = () => {
  addModalActive.value = !addModalActive.value;
};

const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  const isDuplicate =
    savedCities.value.length > 0 &&
    savedCities.value.find((city) => {
      return city.city === locationObj.city && city.state === locationObj.state;
    });

  if (!isDuplicate) {
    savedCities.value.push(locationObj);
    localStorage.setItem("savedCities", JSON.stringify(savedCities.value));
    toggleAddModal();
    addModalMessage.value =
      "저장되었습니다.<br>이제 메인 페이지에서 확인할 수 있습니다.";
  } else {
    toggleAddModal();
    addModalMessage.value = "이미 저장된 지역입니다.";
  }

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};
</script>
