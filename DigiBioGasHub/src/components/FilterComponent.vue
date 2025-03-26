<template>
    <div class="filter-component">
        <ion-button @click="toggleVisibility">
            {{ isCardVisible ?  $t('filter.hide')  :  $t('filter.show')  }}
        </ion-button>
        <ion-button @click="toggleWidth">
            {{ $t('filter.width') }}
        </ion-button>

        <ion-card v-if="isCardVisible" :class="{'wide-card': isWide, 'narrow-card': !isWide}">
            <ion-list>
                <div v-for="category in filtersData" :key="category.value">
                    
                    <ion-item :key="category.value">
                        <ion-checkbox
                            slot="start"
                            v-model="selectedFilters[category.value]"
                            :value="category.value"
                            :key="category.value"
                        />
                        <ion-label style="margin-left:10px">{{ category.label }}</ion-label>
                    </ion-item>
                </div>
            </ion-list>
        </ion-card>
    </div>
</template>

<script>
import { defineComponent, ref, watch, toRaw } from 'vue'
import { IonList, IonItem, IonLabel, IonCheckbox, IonCard, IonButton } from '@ionic/vue'


export default defineComponent({
    name: 'FilterComponent',
    components: { IonList, IonItem, IonLabel, IonCheckbox, IonCard, IonButton },
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
    gap: 1rem;
    padding: 1rem;
}

ion-button {
    --background: #007bff;
    --background-focused: #0056b3;
    --border-radius: 4px;
}

.wide-card {
    width: 100%;
    transition: width 0.3s ease;
}

.narrow-card {
    width: 300px;
    transition: width 0.3s ease;
}

ion-card {
    --background: #f8f9fa;
    --border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 1rem;
}
</style>