<template>
    <IonPage>
        <NavBarComponent />
        <IonContent>
            <div style="display: flex; width: 100%; height: 100%;">
                <div style="width: 300px; border-right: 1px solid #ccc; padding: 1rem;">
                    <h2>Filters</h2>
                    <!-- Add filtering elements here -->
                </div>
                <div style="flex: 1;">
                    <MapComponent :propA="[{coords:[22.846,62.792],color:'red'},{coords:[22.846,62.992],color:'red'}]" />
                </div>
            </div>
        </IonContent>
        <FooterComponent />
    </IonPage>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue'
import MapComponent from '@/components/MapComponent.vue'
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default {
    name: 'MapPage',
    components: {
        IonPage,
        IonContent,
        MapComponent,
        NavBarComponent,
        FooterComponent,
    }
}
</script>

<style scoped>
/* Optional styling */
</style>