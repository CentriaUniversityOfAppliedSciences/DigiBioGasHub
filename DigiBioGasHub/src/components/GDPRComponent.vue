<template>
                   <ion-grid>
                        
                            <p class="ion-text-wrap">{{$t("gdpr.docTitle")}}</p>
                       
                            <p class="ion-text-wrap">{{$t("gdpr.createdDate")}}</p>
                       
                            <p class="ion-text-wrap">{{$t("gdpr.updatedDate")}}</p>
                        
                            <p class="ion-text-wrap">{{$t("gdpr.section")}}</p>
                        
                            <p class="ion-text-wrap">{{$t("gdpr.lawNumber")}}<br/></p>
                       

                        <ion-item>
                        <ion-label style="white-space: pre-line;"><h2>{{$t("gdpr.p1Title")}}</h2><br/>{{$t("gdpr.p1Content")}}<br/></ion-label>
                    </ion-item>
                        <ion-item>
                        <ion-label style="white-space: pre-line"><h2>{{$t("gdpr.p2Title")}}</h2><br/>{{$t("gdpr.p2Content")}}<br/></ion-label>
                        
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p3Title")}}</h2><br/>{{$t("gdpr.p3Content")}}<br/></ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p4Title")}}</h2><br/>{{$t("gdpr.p4Content")}}<br/></ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p5Title")}}</h2><br/>{{$t("gdpr.p5Content")}}<br/></ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p6Title")}}</h2><br/>{{$t("gdpr.p6Content")}}<br/></ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p7Title")}}</h2><br/>{{$t("gdpr.p7Content")}}<br/></ion-label>

                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p8Title")}}</h2><br/>{{$t("gdpr.p8Content")}}<br/></ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p9Title")}}</h2><br/>{{$t("gdpr.p9Content")}}<br/></ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p10Title")}}</h2><br/>{{$t("gdpr.p10Content")}}<br/></ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p11Title")}}</h2><br/>{{$t("gdpr.p11Content")}}<br/></ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p12Title")}}</h2><br/>{{$t("gdpr.p12Content")}}<br/></ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap"><h2>{{$t("gdpr.p13Title")}}</h2><br/>{{$t("gdpr.p13Content")}}<br/></ion-label>
                    </ion-item>
                    
                    </ion-grid>
            
</template>
<script>
import {  IonItem,IonLabel, IonGrid,  } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'GDPRComponent',
    components: {
        IonLabel,
        IonGrid,
        IonItem,
        
    },
    setup(){
        return { }
    },
    methods:{
        
    }
});
</script>