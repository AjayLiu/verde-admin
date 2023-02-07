import React, { useState } from "react";
import "@config/firebase";
import { Button, Text, TextInput, View } from "react-native";
import { Challenge } from "src/types";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import DateTimePicker, {
	DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { db } from "@config/firebase";

export default function App() {
	const [challenge, setChallenge] = useState<Challenge>({
		title: "Title",
		description: "Description",
		points: 10,
		startTime: Timestamp.now(),
		expirationTime: Timestamp.now(),
		uid: uuidv4(),
	});

	const createChallenge = async (challenge: Challenge) => {
		const docRef = await setDoc(
			doc(db, "challenges", challenge.uid),
			challenge,
		);
	};
	const submit = async () => {
		await createChallenge(challenge);
	};

	return (
		<View style={{ marginTop: 200, alignItems: "center" }}>
			<Text>Title:</Text>
			<TextInput
				onChangeText={(newTitle) => {
					setChallenge({
						...challenge,
						title: newTitle,
						// description: "hi",
						// points: 10,
					});
				}}
				value={challenge?.title}
			></TextInput>
			<Text>Description:</Text>
			<TextInput
				onChangeText={(newDescription) => {
					setChallenge({
						...challenge,
						// title: newTitle,
						description: newDescription,
						// points: 10,
					});
				}}
				value={challenge?.description}
			></TextInput>
			<Text>Points:</Text>
			<TextInput
				onChangeText={(newPoints) => {
					setChallenge({
						...challenge,
						// title: newTitle,
						// description: "hi",
						points: +newPoints,
					});
				}}
				value={challenge?.points.toString()}
				keyboardType="numeric"
			></TextInput>
			<Text>
				Start Time: {challenge.startTime.toDate().toLocaleString()}
			</Text>
			<DateTimePicker
				testID="dateTimePicker"
				value={challenge.startTime.toDate()}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				mode="datetime"
				is24Hour={true}
				onChange={(newDate) =>
					setChallenge({
						...challenge,
						startTime: Timestamp.fromMillis(
							newDate.nativeEvent.timestamp || 0,
						),
					})
				}
			/>
			<Text>
				Expiration Time: {challenge.startTime.toDate().toLocaleString()}
			</Text>
			<DateTimePicker
				testID="dateTimePicker"
				value={challenge.expirationTime.toDate()}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				mode="datetime"
				is24Hour={true}
				onChange={(newDate) =>
					setChallenge({
						...challenge,
						expirationTime: Timestamp.fromMillis(
							newDate.nativeEvent.timestamp || 0,
						),
					})
				}
			/>
			<Button title="Confirm" onPress={() => submit()} />
		</View>
	);
}
