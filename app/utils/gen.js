export default class Gen {

	static isDevelopment() {
		return true;
	}

	static isServer() {
		return false;
	}

	static isProduction() {
		return false;
	}

	static getBaseUrl() {
		return Gen.isDevelopment() ? 'https://quicknodeserver.herokuapp.com' : 'https://lolmenow.herokuapp.com';
	}

	static getDisplayTime(time) {
        const date = new Date(time);
        const currentDate = new Date();
        let displayTime = 'just now';
        let diff = currentDate.getTime() - date.getTime();
        diff = Math.floor(diff/1000);
        if(diff > 0) {
            displayTime = diff > 1 ? diff + ' seconds ago' : '1 second ago';
        }
        diff = Math.floor(diff/60);
        if(diff > 0) {
            displayTime =diff > 1 ? diff + ' minutes ago' : '1 minute ago';
        }
        diff = Math.floor(diff/60);
        if(diff > 0) {
            displayTime = diff > 1 ? diff + ' hours ago' : '1 hour ago';
        }
        diff = Math.floor(diff/24);
        if(diff > 0) {
            displayTime = diff > 1 ? diff + ' days ago' : '1 day ago';
        }
        diff = Math.floor(diff/30);
        if(diff > 0) {
            displayTime = diff > 1 ? diff + ' months ago': '1 month ago';
        }
        diff = Math.floor(diff /12);
        if(diff > 0){
            displayTime = diff > 1 ? diff + ' years ago': '1 year ago';
        }
		return displayTime;
	}

	static getAuth() {
		return {
			headers: {
				Authorization: '',
			},
		};
	}

	static isLogEnabled() {
		return true;
	}

	static log(...printStatement) {
		if (this.isLogEnabled() && this.isDevelopment()) {
			console.log(...printStatement);
		}
	}

    // merge two arrays a1 and a2 based on _id key.. maintain the order of elements as well
	static merge(a1, a2) {
		const hash = new Map();
		a1.concat(a2).forEach((obj) => {
			hash.set(obj._id, Object.assign(hash.get(obj._id) || {}, obj));
		});
		return Array.from(hash.values());
	}

	static getUserReactionCount({userReaction, type}) {
		return userReaction ? userReaction[type] : null;
	}

	static max(a, b) {
		return a > b ? a : b;
	}

	static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}
