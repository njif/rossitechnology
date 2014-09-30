;(function (ns) {

	var PageMenu = function(holder, state, events) {
		this._holder = holder;
		this._state = state;
		this._events = events;

		this._controls = {};

		this._init();
	};

	PageMenu.prototype = {

		_init: function() {

/*			var state = this._state,
				holder = this._holder,
				events = this._events,
				keys = Object.keys(events),
				count = keys.length,
				val, i,
				ev;

			var childs = holder.find(['data-item']);
			var i, len = childs.length, control;
			for (i=0; i < len; i++)
			{
				control = childs.eq(i);
				control.on('click', function() {
					state.raise(events[keys[i]]);
				});
				this._controls[control.data("item")] = control;
			}*/
		}
	};

	ns.PageMenu = PageMenu;

}(window.rossi || window));