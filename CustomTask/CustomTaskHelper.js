({
	doinit : function(component, event, helper) {
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
                console.log('Tasks'); 
            } 
        });
        $A.enqueueAction(action); 		
    }
})