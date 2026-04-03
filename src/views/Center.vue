<script setup>
import { useRouter } from 'vue-router';
import { ChevronLeft, ChevronRight, Megaphone, Flag, MessageSquare, Lightbulb } from 'lucide-vue-next';

const router = useRouter();
const placeholderIcon = 'https://picsum.photos/seed/placeholder/24/24?grayscale';

const downloadApp = () => {
  console.log('Download App clicked');
  // Implement download logic here
};

// Set to false to use your custom images
const useDemoIcons = true;
</script>

<template>
  <div class="view-container">
    <div class="header">
      <div class="header-back">
        <ChevronLeft v-if="useDemoIcons" :size="24" />
        <img v-else :src="placeholderIcon" style="width: 24px; height: 24px;" />
      </div>
      <div class="header-title">Message Notification</div>
    </div>
    <div class="tabs">
      <div class="tab-item active">Message Center</div>
      <div class="tab-item" @click="router.push('/settings')">Message Settings</div>
    </div>
    <div class="content">
      <div class="category-list">
        <div class="category-item" @click="router.push('/system')">
          <div class="category-icon-wrapper" :style="{ background: useDemoIcons ? '#00D1FF' : 'transparent' }">
            <Megaphone v-if="useDemoIcons" :size="20" />
            <img v-else :src="'/megaphone.png'" style="width: 40px; height: 40px;" />
          </div>
          <div class="category-info">
            <div class="category-name">Marketing Messages</div>
          </div>
          <ChevronRight v-if="useDemoIcons" :size="20" color="#CCC" />
          <img v-else :src="'/chevron-right.png'" style="width: 20px; height: 20px;" />
        </div>
        <div class="category-item" @click="router.push('/activity')">
          <div class="category-icon-wrapper" :style="{ background: useDemoIcons ? '#00C9C8' : 'transparent' }">
            <Flag v-if="useDemoIcons" :size="20" />
            <img v-else :src="'/flag.png'" style="width: 40px; height: 40px;" />
          </div>
          <div class="category-info">
            <div class="category-name">Activity Notification</div>
          </div>
          <ChevronRight v-if="useDemoIcons" :size="20" color="#CCC" />
          <img v-else :src="'/chevron-right.png'" style="width: 20px; height: 20px;" />
        </div>
        <div class="category-item" @click="router.push('/system')">
          <div class="category-icon-wrapper" :style="{ background: useDemoIcons ? '#00A9A5' : 'transparent' }">
            <MessageSquare v-if="useDemoIcons" :size="20" />
            <img v-else :src="'/message-square.png'" style="width: 40px; height: 40px;" />
          </div>
          <div class="category-info">
            <div class="category-name">Interactive Message</div>
          </div>
          <ChevronRight v-if="useDemoIcons" :size="20" color="#CCC" />
          <img v-else :src="'/chevron-right.png'" style="width: 20px; height: 20px;" />
        </div>
      </div>
      <div class="bottom-tip">
        <Lightbulb v-if="useDemoIcons" :size="20" class="tip-icon" />
        <img v-else :src="'/lightbulb.png'" style="width: 20px; height: 20px;" class="tip-icon" />
        <div class="tip-text">
          Click <span class="tip-link" @click="downloadApp">"Download App"</span> for faster and more stable message push notifications.
        </div>
      </div>
    </div>
  </div>
</template>
