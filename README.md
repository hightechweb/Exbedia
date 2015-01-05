Exbedia Mobile App
==================

Exbedia Mobile App using hybrid approach. Frameworks used:

* ionic framework - http://ionicframework.com/
* Apache Cordova - http://cordova.apache.org/


## Getting Started 

* Install [node.js](http://nodejs.org/)
* Install Ionic `npm install -g cordova ionic`

### iOS support (Mac only)
* Reset plugins installation `cordova platform rm ios`
* Add ios support `cordova platform add ios`
* Build ios `ionic build ios`
* Run emulator `ionic emulate ios`
* Run the app in the ios emulator `ionic run ios`

### Android Support

* Install the [Android SDK](http://spring.io/guides/gs/android/)
* [Install ANT](http://apache.claz.org//ant/binaries/apache-ant-1.9.4-bin.zip)
    * make sure ANT_HOME is set, and
        * %ANT_HOME%\bin is in your path if on Windows
        * $ANT_HOME/bin is in your path if on Linux/Mac
* Add ios support `ionic platform add android`
* Build ios `ionic build android`
* Run emulator `ionic emulate android` (this will start an Android emulator and take some time)
    * You may need to manually install [HAXM](https://software.intel.com/en-us/android/articles/intel-hardware-accelerated-execution-manager-end-user-license-agreement) if you get errors like "HAX is not working..."
* Run the app in the Android emulator `ionic run android`
