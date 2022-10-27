<template>
  <main>
    <a @click="showDrawer" class="text-white">FAQ</a>
    <a-drawer
      v-model:visible="visible"
      class="custom-class"
      style="color: red"
      placement="right"
    >
      <div class="faq-card">
        <h2 class="faq-card__title">FAQ</h2>
        <ul class="faq-card__list">
          <li class="faq-card__item">
            <button class="faq-card__button faq-card__button_active">
              How do I add a new allergy?<i
                class="faq-card__icon fa fa-caret-down"
                aria-hidden="true"
              ></i>
            </button>
            <p class="faq-card__desc">
              You can add a new allergy by clicking on the "Add Allergy" button
              in the home page.
            </p>
          </li>
          <li class="faq-card__item">
            <button class="faq-card__button faq-card__button_active">
              Can I add multiple allergies?<i
                class="faq-card__icon fa fa-caret-down"
                aria-hidden="true"
              ></i>
            </button>
            <p class="faq-card__desc">
              Yes, you can add more than one allergy.
            </p>
          </li>

          <li class="faq-card__item">
            <button class="faq-card__button faq-card__button_active">
              How do I see all the users in the app?<i
                class="faq-card__icon fa fa-caret-down"
                aria-hidden="true"
              ></i>
            </button>
            <p class="faq-card__desc">
              Only admins are able to see all the users in the app.
            </p>
          </li>
        </ul>
      </div>
    </a-drawer>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "FAQ",
  setup() {
    const visible = ref(false);
    const showDrawer = () => (visible.value = true);
    return {
      visible,
      showDrawer,
    };
  },
});
</script>

<style scoped lang="scss">
@import url(https://fonts.bunny.net/css?family=anek-gujarati:400,600);
// fonts
$primary-font-fallback: sans-serif;
$primary-font: "Anek Gujaratii", $primary-font-fallback;
$fs-400: 0.8rem;
$fw-600: 600;

// palette
$white-400: hsl(0, 0%, 100%);
$black-400: hsl(0, 0%, 0%);
$pink-400: hsl(14, 51%, 55%);
$gray-350: hsl(25, 9%, 15%);
$gray-400: hsl(25, 9%, 25%);
$gray-500: hsl(21, 6%, 51%);

$body_bg-gradient: linear-gradient(45deg, $gray-400, $gray-500);
$faq-card_bg-clr: $white-400;
$faq-card__title_clr: $gray-350;
$faq-card__item_clr: $gray-400;
$faq-card__button_clr: $gray-350;
$faq-card__button_hover-clr: $pink-400;
$faq-card__icon_clr: $pink-400;

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box: {
    sizing: border-box;
  }
}

body {
  background: $body_bg-gradient;
  display: grid;
  font: {
    size: $fs-400;
    family: $primary-font;
  }
  min: {
    height: 100vh;
  }
  place: {
    items: center;
  }
}

.faq-card {
  background: $faq-card_bg-clr;
  width: 330px;
  border: {
    radius: 20px;
  }

  &__title {
    color: $faq-card__title_clr;
    padding: {
      block: 1em 0.6em;
    }
    text: {
      align: center;
    }
    font: {
      size: 2rem;
    }
  }

  &__list {
    padding: {
      bottom: 4em;
    }
    list: {
      style: {
        type: none;
      }
    }
  }

  &__item {
    color: $faq-card__item_clr;
    padding: {
      block: 1em;
    }
    margin: {
      inline: 1.5em;
    }
    border: {
      bottom: 1px solid rgba($black-400, 0.2);
    }
  }

  &__button {
    color: $faq-card__button_clr;
    display: flex;
    width: 100%;
    cursor: pointer;
    border: none;
    background: none;
    align: {
      items: center;
    }
    justify: {
      content: space-between;
    }

    &_active {
      transition: color 200ms linear, font-weight 100ms linear,
        margin-bottom 100ms linear;

      .faq-card__icon {
        transition: 200ms linear;
      }

      &:hover:not(:focus) {
        color: $faq-card__button_hover-clr;
      }

      &:not(:focus) {
        + .faq-card__desc {
          visibility: hidden;
          opacity: 0;
          max: {
            height: 0;
          }
        }
      }

      &:focus {
        margin: {
          bottom: 1em;
        }
        font: {
          weight: $fw-600;
        }

        + .faq-card__desc {
          visibility: visible;
          opacity: 1;
          max: {
            height: 100px;
          }
        }

        .faq-card__icon {
          transform: rotate(180deg);
        }
      }
    }
  }

  &__icon {
    color: $faq-card__icon_clr;
  }

  &__desc {
    transition: opacity 0.7s linear;
    max: {
      inline: {
        size: calc(100% - 13px);
      }
    }
    line: {
      height: 1.1rem;
    }
  }
}
</style>
