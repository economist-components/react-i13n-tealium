# react-i13n-tealium

This plugin provide an external config object that can be configured to obtain
a custom manipulation of the information intended to the Tealium global var.

# Manual test

To manually test the manipulation applied via the config pageView handler open
the console and run 'window.reactI13n.execute('pageview',{});' then check the
value of window.utag_data.
