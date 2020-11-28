<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col v-for="(card, idx) in cards" :key="idx" md="4" xs="6">
        <v-hover
          v-slot:default="{ hover }"
          :open-delay="openDelay"
          :close-delay="closeDelay"
          :value="value"
        >
          <profile-card :hover="hover" :card="card" />
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ProfileCard from '@/components/ProfileCard';
  export default {
    layout: 'profile',
    components: {
      ProfileCard,
    },
    data() {
      return {
        openDelay: '0',
        closeDelay: '0',
        value: false,
        cards: [
          {
            emoji: '📃',
            title: '내 정보 수정',
            text: '회원 정보를 수정합니다.',
            to: '/profile/update',
          },
          // {
          //   emoji: '📁',
          //   title: '스터디 관리',
          //   text: '운영중인 스터디를 관리합니다.',
          //   to: '/profile/study',
          // },
          {
            emoji: '🗑',
            title: '회원 탈퇴',
            text: '회원 정보를 삭제합니다.',
            to: '/profile/leave',
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped></style>
