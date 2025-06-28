import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageSourcePropType,
    SafeAreaView,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, RouteProp } from '@react-navigation/native';

import RoundedButton from '../components/RoundedButton';
import { colors } from '../components/Color';
import footerStyles from '../styles/FooterStyles';
import { Address } from '../types';
import TopBar from '../components/TopBar';


import { CartStackParamList } from '../types';

export type PaymentCard = {
    id: string;
    brand: 'Visa' | 'MasterCard' | 'ApplePay';
    last4: string;
    expiry: string;
    logo: ImageSourcePropType;
};
const addresses: Address[] = [
    { id: '1', title: 'Home', details: '123 Main Street, Riyadh, Saudi Arabia' },
    { id: '2', title: 'Work', details: 'Tech Park, Jeddah, Saudi Arabia' },
    { id: '3', title: 'Parents', details: '456 Family Road, Dammam, Saudi Arabia' },
];

const paymentCards: PaymentCard[] = [
    { id: '1', brand: 'Visa', last4: '1234', expiry: '12/25', logo: require('../../assets/visa.png') },
    { id: '2', brand: 'MasterCard', last4: '5678', expiry: '06/24', logo: require('../../assets/mastercard.png') },
    { id: '3', brand: 'ApplePay', last4: '0000', expiry: 'N/A', logo: require('../../assets/ApplePay.jpg') },

];
type RouteProps = RouteProp<CartStackParamList, 'Checkout'>;


const CheckoutScreen: React.FC = () => {

    const route = useRoute<RouteProps>();
    const { total } = route.params;

    const [selectedId, setSelectedId] = useState<string>('1');

    const [selectedPaymentCard, setSelectedPaymentCard] = useState<string>('1');


    const [visible, setVisible] = useState(false);

    const orderId = '444297';


    const renderItem = ({ item }: { item: Address }) => {
        const isSelected = item.id === selectedId;

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => setSelectedId(item.id)}
                activeOpacity={0.9}
            >
                {/* Edit Icon */}
                <TouchableOpacity style={styles.editIcon}>
                    <Icon name="pencil" size={20} color="#666" />
                </TouchableOpacity>

                {/* Address Row */}
                <View style={styles.headerRow}>
                    <Icon
                        name={isSelected ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                        size={22}
                        color={isSelected ? '#4CAF50' : '#ccc'}
                    />

                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.details}>{item.details}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        );
    };


    const renderCard = ({ item }: { item: PaymentCard }) => {
        const isSelected = item.id === selectedPaymentCard;

        return (
            <TouchableOpacity
                style={[
                    styles.paymentCard,
                    isSelected && { borderColor: '#4CAF50', borderWidth: 2 },
                ]}
                onPress={() => setSelectedPaymentCard(item.id)}
                activeOpacity={0.9}
            >
                <Image source={item.logo} style={styles.logo} resizeMode='contain' />

                <View style={styles.rowTop}>

                    <Text style={styles.brand}>{item.brand}</Text>

                </View>

                <Text style={styles.number}>•••• •••• {item.last4}</Text>
                <Text style={styles.expiry}>Exp: {item.expiry}</Text>

                <Icon
                    name={isSelected ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                    size={20}
                    color={isSelected ? '#4CAF50' : '#ccc'}
                />

            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            <TopBar title={"Checkout"} them={"dark"} />

            {/* Modal */}
            <Modal
                transparent
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <Icon name="check-circle" size={80} color="#4CAF50" />
                        <Text style={styles.modalTitle}>Order Successfull</Text>
                        <Text style={styles.message}>
                            Your Order #{orderId} is successfully placed
                        </Text>



                        <RoundedButton
                            title="Track My Order"
                            onPress={() => null}
                            backgroundColor="#28a745"
                            textColor="#fff"
                        />


                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.okButton}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.okButtonText}>Go Back</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <View style={styles.labelcontainer}>
                <Text style={styles.label}>Address</Text>

                <TouchableOpacity>
                    <Text style={styles.addNew}>Add New</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={addresses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />


            <View style={{ ...styles.labelcontainer, marginTop: 20, }}>
                <Text style={styles.label}>Payment</Text>

                <TouchableOpacity>
                    <Text style={styles.addNew}>Add New</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                data={paymentCards}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    alignItems: 'stretch', padding: 16,
                    paddingBottom: 120,
                }}
            />


            {/* Checkout Button */}
            <View style={footerStyles.footer}>

                <View>
                    <Text>Total Price</Text>
                    <Text style={footerStyles.totalText}>${total.toFixed(2)}</Text>
                </View>

                <RoundedButton
                    title="Payment"
                    onPress={() => setVisible(true)}
                    backgroundColor="#28a745"
                    textColor="#fff"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        position: 'relative',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    details: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    editIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 4,
    },

    paymentCard: {
        width: Dimensions.get('window').width * 0.5,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        minHeight: 165,
        maxHeight: 180,
    },
    rowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    brand: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    number: {
        fontSize: 15,
        color: '#555',
        marginBottom: 4,
    },
    expiry: {
        fontSize: 13,
        color: '#777',
        marginBottom: 10,
    },
    logo: {
        width: 50,
        height: 50,
        objectFit: 'contain'
    },
    labelcontainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontFamily: 'Cairo-bold', fontSize: 22,
    },
    addNew: {
        fontFamily: 'Cairo-bold', fontSize: 16,
        color: colors.mainGreen
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 28,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 16,
        color: '#333',
    },
    message: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginVertical: 12,
        marginBottom: 20,
    },
    okButton: {
        paddingVertical: 15,
        paddingHorizontal: 65,
        borderRadius: 25, // This makes it rounded
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.mainGreen,
        width: '100%',
    },
    okButtonText: {
        fontWeight: '600',
        color: colors.mainGreen
    },
});

export default CheckoutScreen;
