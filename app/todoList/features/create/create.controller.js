angular
    .module('todoList.create') // No array, as we are "extending" the module
    .controller('CreateCtrl', CreateCtrl); // Define our controller (Notice the naming convention - uppercase first letter, Ctrl suffix)

function CreateCtrl($scope, $http) {
    var vm = this; // vm stands for View Model - anything on "the vm" is exposed to the view

    
}
