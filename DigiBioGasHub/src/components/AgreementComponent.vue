<template>
    <IonCard>
        <IonCardHeader>
            <IonCardSubtitle>Agreements</IonCardSubtitle>
            <IonCardTitle>Manage your agreements</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
            <IonList>
                <IonItem v-for="agreement in agreements" :key="agreement.id">
                    <div class="agreement-info">
                        <strong>{{ agreement.name }}</strong>
                        <p>Status: {{ agreement.status }}</p>
                    </div>
                    <IonButton v-if="agreement.status === 'draft'" @click="editAgreement(agreement)">Edit</IonButton>
                    <IonButton fill="outline" @click="showAgreement(agreement)">Show</IonButton>
                </IonItem>
            </IonList>
            <IonButton expand="block" @click="createNewDraft">Create New Draft</IonButton>
        </IonCardContent>

        <IonModal :isOpen="modalOpen" @didDismiss="closeModal">
            <div class="modal-content">
                <h2>{{ selectedAgreement?.name }}</h2>
                <p>Status: {{ selectedAgreement?.status }}</p>
                <p>{{ selectedAgreement?.description }}</p>
                <IonButton expand="block" @click="closeModal">Close</IonButton>
            </div>
        </IonModal>
    </IonCard>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonList, IonButton, IonModal } from '@ionic/vue'
export default defineComponent({
name: 'AgreementComponent',
components: {
IonCard,
IonCardHeader,
IonCardSubtitle,
IonCardTitle,
IonCardContent,
IonItem,
IonList,
IonButton,
IonModal
},
setup() {

const agreements = ref([
    { id: 1, name: 'Agreement A', status: 'draft', description: 'Draft description...' },
    { id: 2, name: 'Agreement B', status: 'active', description: 'Active description...' }
])

const modalOpen = ref(false)
const selectedAgreement = ref(null)
return{agreements, modalOpen, selectedAgreement}
},
methods:{
    showAgreement(agreement) {
    selectedAgreement.value = agreement
    modalOpen.value = true
},

closeModal() {
    modalOpen.value = false
},

 editAgreement(agreement) {
    // handle draft edit
    alert(`Editing: ${agreement.name}`)
},

 createNewDraft() {
    // create new draft
    alert('Create a new agreement draft')
},
}

})
</script>

<style scoped>
.agreement-info {
    flex: 1;
}
.modal-content {
    padding: 16px;
}
</style>