angular.module('proton.composer')
    .directive('actionCompose', ($rootScope) => {

        return {
            scope: {
                model: '=actionCompose'
            },
            link(scope, element, { actionComposeType }) {
                function onClick(e) {
                    e.preventDefault();

                    if (/addFile|addEmbedded/.test(actionComposeType)) {
                        return $rootScope.$emit('addFile', {
                            asEmbedded: (actionComposeType === 'addEmbedded'),
                            message: scope.model
                        });
                    }

                    $rootScope.$emit('composer.new', {
                        type: actionComposeType,
                        data: {
                            message: scope.model
                        }
                    });
                }

                element[0].addEventListener('click', onClick);

                scope.$on('$destroy', () => {
                    element[0].removeEventListener('click', onClick);
                });
            }
        };
    });
