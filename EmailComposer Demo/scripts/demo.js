(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        checkAvailable: function () {
            if (!this.checkSimulator()) {
            	window.plugin.email.isServiceAvailable(this.callback);
            }
        },

        composeEmail: function () {
            if (!this.checkSimulator()) {
                window.plugin.email.open({
                    // TODO grab some of these values from a form on the demo page
                    to:          ['eddyverbruggen@gmail.com'],
                    cc:          ['eddyverbruggen@gmail.com'],
                    bcc:         ['eddyverbruggen@gmail.com', 'eddyverbruggen@gmail.com'],
                    attachments: ['www://styles/images/logo.png', 'www://styles/images/logo2x.png'],
                    subject:     'Testing the EmailComposer plugin',
                    body:        '<h1>Hello!</h1>This is a nice HTML email.',
                    isHtml:      true
                }, this.callback)
            }
        },

        callback: function(msg) {
            navigator.notification.alert(JSON.stringify(msg), null, 'EmailComposer callback', 'Close');
        },

        checkSimulator: function() {
            if (window.plugins === undefined) {
                alert('Plugin not available. Are you running in the simulator?');
                return true;
            }
            return false;
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);