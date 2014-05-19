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
                    to:          ['person1@domain.com'],
                    cc:          ['person2@domain.com'],
                    bcc:         ['person3@domain.com', 'person4@domain.com'],
                    attachments: ['www://styles/images/logo.png', 'www://styles/images/logo2x.png'],
                    subject:     'EmailComposer plugin test',
                    body:        '<h2>Hello!</h2>This is a nice <strong>HTML</strong> email with two attachments.',
                    isHtml:      true
                }, this.callback)
            }
        },

        callback: function(msg) {
            navigator.notification.alert(JSON.stringify(msg), null, 'EmailComposer callback', 'Close');
        },

        checkSimulator: function() {
            if (window.plugin === undefined) {
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
