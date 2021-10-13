import React from 'react';
import EscPosPrinter, { getPrinterSeriesByName } from 'react-native-esc-pos-printer';
import {
	Button,
	Image,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

async function testPrint() {
	try {
		const printers = await EscPosPrinter.discovery();

		const printer = printers[0];

		await EscPosPrinter.init({
			target: printer.target,
			seriesName: getPrinterSeriesByName(printer.name),
		});

		const printing = new EscPosPrinter.printing();

		const status = await printing
			.initialize()
			.align('center')
			.initialize()
			.align('center')
			.size(6, 6)
			.line('DUDE!')
			.size(1, 1)
			.text('is that a ')
			.bold()
			.underline()
			.text('printer?')
			.bold()
			.underline()
			.newline(2)
			.align('center')
			.image(Image, 200)
			.cut()
			.send();

		console.log('Success:', status);

	} catch (e) {
		console.log('Error:', e);
	}
}

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		// eslint-disable-next-line react-native/no-inline-styles
		<SafeAreaView style={{ ...backgroundStyle, flex: 1 }}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent={true} backgroundColor="transparent" />
			<View
				contentInsetAdjustmentBehavior="automatic"
				style={styles.screen}>
				{/* eslint-disable-next-line react-native/no-inline-styles*/}
				<Text style={{ ...styles.title, color: isDarkMode ? '#fff' : '#000', }}>Test printer</Text>

				<Button onPress={testPrint} color="red" style={styles.btn} title="Print" />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 18,
		marginBottom: 10,
	},
	btn: {
		padding: 5,
	},
});

export default App;
