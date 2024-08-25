<template>
  <div class="survey-container" :class="{ minimized: isMinimized }">
    <transition name="fade">
      <div v-if="!isMinimized" class="survey-card">
        <section class="survey-content">
          <transition name="slide-fade" mode="out-in">
            <div v-if="currentQuestion === 1" key="q1">
              <p>What generation are you from?</p>
              <div class="field">
                <div class="control">
                  <div v-for="(option, index) in generationOptions" :key="index" class="radio">
                    <label class="radio">
                      <input type="radio" v-model="surveyResponses.generation" :value="option.value" />
                      {{ option.label }}
                    </label>
                  </div>
                </div>
              </div>
              <button @click="nextQuestion" :disabled="!surveyResponses.generation" class="button is-primary is-fullwidth">Next</button>
            </div>
          </transition>
          
          <transition name="slide-fade" mode="out-in">
            <div v-if="currentQuestion === 2" key="q2">
              <p>How important is social impact to you when shopping?</p>
              <div class="field">
                <div class="control">
                  <div v-for="(option, index) in socialImpactOptions" :key="index" class="radio">
                    <label class="radio">
                      <input type="radio" v-model="surveyResponses.socialImpact" :value="option.value" />
                      {{ option.label }}
                    </label>
                  </div>
                </div>
              </div>
              <button @click="previousQuestion" class="button is-light">Back</button>
              <button @click="nextQuestion" :disabled="!surveyResponses.socialImpact" class="button is-primary is-fullwidth">Next</button>
            </div>
          </transition>

          <!-- Repeat for additional questions -->
          <transition name="slide-fade" mode="out-in">
            <div v-if="currentQuestion === 3" key="q3">
              <p>Would you change your consumer behavior based on a business that does social impact initiatives?</p>
              <div class="field">
                <div class="control">
                  <div v-for="(option, index) in behaviorChangeOptions" :key="index" class="radio">
                    <label class="radio">
                      <input type="radio" v-model="surveyResponses.behaviorChange" :value="option.value" />
                      {{ option.label }}
                    </label>
                  </div>
                </div>
              </div>
              <button @click="previousQuestion" class="button is-light">Back</button>
              <button @click="nextQuestion" :disabled="!surveyResponses.behaviorChange" class="button is-primary is-fullwidth">Next</button>
            </div>
          </transition>

          <transition name="slide-fade" mode="out-in">
            <div v-if="currentQuestion === 4" key="q4">
              <p>How likely are you to pay more for a product from a company that supports social impact initiatives?</p>
              <div class="field">
                <div class="control">
                  <div v-for="(option, index) in payMoreOptions" :key="index" class="radio">
                    <label class="radio">
                      <input type="radio" v-model="surveyResponses.payMore" :value="option.value" />
                      {{ option.label }}
                    </label>
                  </div>
                </div>
              </div>
              <button @click="previousQuestion" class="button is-light">Back</button>
              <button @click="nextQuestion" :disabled="!surveyResponses.payMore" class="button is-primary is-fullwidth">Next</button>
            </div>
          </transition>

          <transition name="slide-fade" mode="out-in">
            <div v-if="currentQuestion === 5" key="q5">
              <p>How often do you research a company’s social impact practices before making a purchase?</p>
              <div class="field">
                <div class="control">
                  <div v-for="(option, index) in researchOptions" :key="index" class="radio">
                    <label class="radio">
                      <input type="radio" v-model="surveyResponses.research" :value="option.value" />
                      {{ option.label }}
                    </label>
                  </div>
                </div>
              </div>
              <button @click="previousQuestion" class="button is-light">Back</button>
              <button @click="submitSurvey" :disabled="!surveyResponses.research" class="button is-primary is-fullwidth">Submit</button>
            </div>
          </transition>
        </section>
        <button @click="toggleMinimize" class="button minimize-button">Minimize</button>
      </div>
    </transition>

    <div v-if="isMinimized" class="survey-widget" @click="toggleMinimize">
      <span class="icon">
        <i class="fas fa-globe"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMinimized: false,
      currentQuestion: 1,
      surveyResponses: {
        generation: null,
        socialImpact: null,
        behaviorChange: null,
        payMore: null,
        research: null,
      },
      generationOptions: [
        { value: 'gen-z', label: 'Generation Z (1997-2012)' },
        { value: 'millennial', label: 'Millennial (1981-1996)' },
        { value: 'gen-x', label: 'Generation X (1965-1980)' },
        { value: 'boomer', label: 'Baby Boomer (1946-1964)' },
      ],
      socialImpactOptions: [
        { value: 'very-important', label: 'Very Important' },
        { value: 'somewhat-important', label: 'Somewhat Important' },
        { value: 'not-important', label: 'Not Important' },
      ],
      behaviorChangeOptions: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'maybe', label: 'Maybe' },
      ],
      payMoreOptions: [
        { value: 'very-likely', label: 'Very Likely' },
        { value: 'somewhat-likely', label: 'Somewhat Likely' },
        { value: 'not-likely', label: 'Not Likely' },
      ],
      researchOptions: [
        { value: 'always', label: 'Always' },
        { value: 'sometimes', label: 'Sometimes' },
        { value: 'never', label: 'Never' },
      ],
    };
  },
  methods: {
    nextQuestion() {
      this.currentQuestion += 1;
    },
    previousQuestion() {
      this.currentQuestion -= 1;
    },
    methods: {
  submitSurvey() {
    fetch('/api/submit-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.surveyResponses),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
},
    toggleMinimize() {
      this.isMinimized = !this.isMinimized;
    },
  },
};
</script>

<style scoped>
.survey-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.survey-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  width: 300px;
}

.survey-content {
  margin-bottom: 16px;
}

.minimize-button {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: #3273dc;
  text-align: right;
}

.survey-widget {
  background: #3273dc;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.survey-widget .icon {
  font-size: 24px;
}

.survey-widget:hover {
  transform: scale(1.1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s ease;
  transform: translateX(10px);
  opacity: 0;
}
</style>