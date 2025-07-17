<template>
    <div class="filter-component">
        <div class="filter-box">
        <ion-button @click="toggleVisibility">
            <ion-icon :icon="isCardVisible ? 'filter-sharp' : 'filter-sharp'" slot="start" style="margin-right: 5px;"></ion-icon>
            {{ isCardVisible ? $t('filter.hide')  :  $t('filter.show')  }}
        </ion-button>

        <ion-card v-if="isCardVisible">
            <ion-list>
                <div v-for="category in filtersData" :key="category.value">
                    
                    <ion-item :key="category.value">
                        <ion-checkbox
                            slot="start"
                            v-model="selectedFilters[category.value]"
                            :value="category.value"
                            :key="category.value"
                        />
                        <ion-label style="margin-left: 8px;">{{ category.label }}</ion-label>
                    </ion-item>
                </div>
            </ion-list>
        </ion-card>
    </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch, toRaw } from 'vue'
import { IonList, IonItem, IonLabel, IonCheckbox, IonCard, IonButton, IonIcon } from '@ionic/vue'
import { addIcons } from 'ionicons';
import { filterSharp } from 'ionicons/icons';
addIcons({
    "filter-sharp": filterSharp
});

export default defineComponent({
    name: 'FilterComponent',
    components: { IonList, IonItem, IonLabel, IonCheckbox, IonCard, IonButton, IonIcon },
    props: {
        filtersData: { type: Array, default: () => [] },
        dataToFilter: { type: Array, default: () => [] }
    },
    setup(props, { emit }) {
        const selectedFilters = ref({});
        const isCardVisible = ref(true);
        const isWide = ref(true);
        props.filtersData.forEach(cat => {
                selectedFilters.value[cat.value] = false;
        })
        
        watch(
            selectedFilters,
            () => {
                let filtered = props.dataToFilter
                    .filter(item => {
                        return Object.keys(selectedFilters.value).some(key => {
                            item.category = item.category.toString();
                            if(selectedFilters.value[key] && item.category === key){
                                return selectedFilters.value[key] && item.category === key
                            }
                            else{
                                return Object.keys(selectedFilters.value).every(key => !selectedFilters.value[key])
                            }
                            
                        })
                    })
                emit('filtered-data', filtered)
            },
            { deep: true }
        )

        const toggleVisibility = () => {
            isCardVisible.value = !isCardVisible.value
        }

        const toggleWidth = () => {
            isWide.value = !isWide.value
        }

        return {
            selectedFilters,
            isCardVisible,
            isWide,
            toggleVisibility,
            toggleWidth
        }
    }
    
})
</script>

<style scoped>
.filter-component {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.filter-box {
  width: 100%;
  background-color: var(--ion-color-light);
  padding: 0.8rem;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


ion-button {
    --background: var(--ion-color-primary);
    --background-hover: var(--ion-color-primary-shade);
    --color: var(--ion-color-light);
    --border-radius: 0.75rem;
    font-size: 0.95rem;
    font-weight: 500;
    box-shadow: 0 2px 6px rgba(var(--ion-color-primary-rgb), 0.15);
}

ion-checkbox {
  --size: 24px; 
  --border-radius: 5px; 
  --background: var(--ion-color-primary); 
  --background-checked: var(--ion-color-primary-shade); 
  --border-color: var(--ion-color-primary);
  --border-width: 2px; 
}

ion-button:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
}

ion-card {
    --background: var(--ion-card-background, var(--ion-item-background, var(--ion-background-color)));
    transition: box-shadow 0.3s ease;
}

ion-card:hover {
    box-shadow: 0 6px 18px rgba(var(--ion-color-step-600-rgb), 0.15);
}

ion-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border-radius: 12px;
}

ion-item {
    --inner-padding-end: 0;
    --inner-padding-start: 0;
    --padding-start: 0;
    --min-height: 48px;
    --background: var(--ion-color-step-50);
    --border-radius: 0.5rem;
    padding: 0.5rem;
}

ion-item:hover {
    background-color: var(--ion-color-step-50);
}

</style>
