# Looma Lesson Planning Software
### What is Looma?
Looma is an all-in-one computer. It is powered by an Odroid-C1+ System-on-a-Chip, and comes with a projector and infrared camera + peripheral so that it can be used anywhere in the world.
The computer, developed by VillageTech Solutions, is deployed to rural communities in Nepal and provides students with online textbooks and activities. You can learn more [here](http://villagetechsolutions.org/Education.html).

### What is this project?
We're developing a simple, accessible lesson planning and presentation web application for Looma, a computer developed by VillageTech Solutions. Currently Looma has no cohesive interface that allows for educators to switch easily between different forms of related media (e.g, a teacher teaching from a textbook page has no easy way to show a relevant video). Our application will serve as an interface to create lessons and allow teachers to combine the resources on Looma for a cohesive educational experience.

### How to deploy on my machine?
This project is not yet functioning as a cohesive application just yet (and have yet to do any significant code review). You can find our basic Front End Structure in FrontEnd/index2.html
For development, you need a machine with MongoDB, PHP 5, and the PHP-MongoDB driver. On Ubuntu 14.04, you can simply install using
```
	apt-get install php5-mongo
```
Once installed, clone this repo and run the following command to kick off the dev server.
```
	php -S localhost:8000
```

##### Authors
* Front-End and UI/UX
	* [EliseHerrmannsfeldt](https://github.com/eherrman)
	* [SuparnaJasuja](https://github.com/sjasuja111)
* Back-End and DB Management
	* [Kate Lassalle-Klein](https://github.com/katelk28)
	* [RoshanRamankutty](https://github.com/tzeak)


Made with love @ Santa Clara University
