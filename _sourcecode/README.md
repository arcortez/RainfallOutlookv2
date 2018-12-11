#Easy-Update Tutorial. (For new data)

1. go to the Directory:
	RainfallOutlookv2  >  www  >  data 

2. Open "Forecast.csv" and copy-paste the new data from the .xlsx file into the data columns. Make sure to include the header 
of the columns as the columns will serve as the label for that month. You might be tempted to just rename the xlsx file as a 
csv file, but resist as there are several characters that will break when the conversion is done by renaming.

3. Open agritip.txt" and replace the current agritip to the new one. 
	!!! Make sure to enclose the entire section in double quotes so that the entire text will be read as a single string.
	Example:
	The agritip.txt currently contains:
	
		"If rainfall is <strong>more than 100mm</strong>, planting corn is advisable. If rainfall is <strong>more than 200mm
	</strong>, planting corn and rice is advisable."

4. go back to the Directory:
	RainfallOutlookv2

5.1. For Direct Build
	> Run "cordova run android" while your device in connected with the computer via USB debugging.
	> If you have not yet installed the requirements, please do so. The guide is under "Development Guide"
	> If you do not have a device attached, it starts a local emulator and this might take a while to load, but it might not start if the emulator is not properly configured. GenyMotion is one the suggested mobile development emulators.

5.2. For APK Generation.
	> Run "cordova build android" and the system will tell you where you can find the built APK. Just copy and paste the file.






#Development Guide

Note: As for all projects, the environment setup takes the longest time, and the development will be much smoother if you 
already have the rquirements beforehand.

Technology/Installation Requirements (Android):
1. Android Studio
2. Android SDK
3. Android target
4. Gradle
5. Apache Cordova
	> npm install -g cordova
6. GitHub account (if you want the app to be accessible publicly)
7. PhoneGap (may not be needed if you have already installed Apache Cordova)

 There are guides in the internet for the installation of these applications/packages.
