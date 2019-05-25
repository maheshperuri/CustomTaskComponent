({
    doInit : function(component, event, helper) {
        var action = component.get('c.getTaskList'); 
        action.setCallback(this, function(response){ 
            var state = response.getState(); 
            if(state === "SUCCESS"){ 
                var actionStatus = component.get('c.getStatus'); 
                actionStatus.setCallback(this, function(response){
                    var state = response.getState();
                    if(state === "SUCCESS"){    
                        component.set("v.taskStatusList",response.getReturnValue());
                    }
                });
                $A.enqueueAction(actionStatus); 
                component.set("v.taskList",response.getReturnValue());
                console.log('Tasks'); } 
        });
        $A.enqueueAction(action); 
    },
    navigateToRecord : function(component, event, helper){
        var sObectEvent = $A.get("e.force:navigateToSObject");
        sObectEvent .setParams({
            "recordId": event.target.dataset.index  ,
            "slideDevName": "detail"
        });
        sObectEvent.fire();
    },
    
    navigateToName : function(component, event, helper){
        var sObectEvent = $A.get("e.force:navigateToSObject");
        sObectEvent .setParams({
            "recordId": event.target.dataset.index  ,
            "slideDevName": "detail"
        });
        sObectEvent.fire();
    },
    
    navigateToViewAll : function(component, event, helper){
        var action = component.get('c.getListViews');                
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var listviews = response.getReturnValue();
                var navEvent = $A.get("e.force:navigateToList");
                navEvent.setParams({
                    "listViewId": listviews.Id,
                    "listViewName": null,
                    "scope": "Task"
                });
                navEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    
    closeTask : function(component, event, helper){
        var action = component.get('c.closeTasks');
        action.setParams({
            "taskId": event.currentTarget.dataset.index  
        });                                
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                component.set("v.taskList",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
    
})