<template>
  <div
    class="v-input mx-2 mx-md-4 v-input--hide-details v-input--dense theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--solo-flat v-text-field--is-booted v-text-field--enclosed v-text-field--placeholder rounded-lg"
    style="max-width: 450px"
  >
    <div class="v-input__control">
      <div class="v-input__slot grey lighten-3">
        <div class="v-input__prepend-inner">
          <span
            aria-hidden="true"
            class="v-icon notranslate ml-1 mr-2 theme--light grey--text"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              class="v-icon__svg"
            >
              <path
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              ></path>
            </svg>
          </span>
        </div>
        <div class="v-text-field__slot">
          <input
            autocomplete="off"
            id="doc-search"
            placeholder="Search Vuetify"
            type="text"
            class="ds-input"
            spellcheck="false"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-label="search input"
            aria-owns="algolia-autocomplete-listbox-0"
            dir="auto"
            style=""
          />
          <pre
            aria-hidden="true"
            style="
              position: absolute;
              visibility: hidden;
              white-space: pre;
              font-family: Roboto, sans-serif;
              font-size: 16px;
              font-style: normal;
              font-variant: normal;
              font-weight: 400;
              word-spacing: 0px;
              letter-spacing: normal;
              text-indent: 0px;
              text-rendering: auto;
              text-transform: none;
            "
          >
            input
        </pre
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped></style>
